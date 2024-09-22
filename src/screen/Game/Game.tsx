import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { clone, COLORS, SW } from '../../utils/constants'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { direction } from '../../utils/enum'
import Cell from '../../components/Cell'
import SizeBox from '../../components/SizeBox'
import HomeIcon from '../../assets/icons/HomeIcon'
import UndoIcon from '../../assets/icons/UndoIcon'
import ReloadIcon from '../../assets/icons/ReloadIcon'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStack } from '../../utils/types'

type GameProps = NativeStackScreenProps<RootStack, 'Game'>

const Game = (props: GameProps) => {
    const n = props?.route?.params?.n ?? 4;
    const [matrix, setMatirx] = useState<number[][]>(Array.from({ length: n }, () => Array(n).fill(0)));
    const [score, setScore] = useState<number>(0);
    const [highScore, setHighScore] = useState<number>(0);
    const directionRef = useRef(direction.NONE);
    const firstTimeRef = useRef<boolean>(true);

    const goToHome = () => {
        props?.navigation?.navigate('Home')
    }

    const getNumber = () => {
        const percentage = Math.random();
        return percentage > 0.1 ? 2 : 4
    }

    const getIndexForEmpty = () => {
        const x = Math.floor(Math.random() * n);
        const y = Math.floor(Math.random() * n);
        return { x, y }
    }

    const getRandomNumber = (n: number) => {
        const x = Math.floor(Math.random() * n);
        return x
    }

    const onPressReset = () => {
        Alert.alert("Do you want reset?", "You will lose your progress.", [
            { text: 'Yes', onPress: () => setMatirx(reset), style: 'destructive' },
            { text: 'No', onPress: () => { }, style: 'default' },
        ]);
    }

    const onPressUndo = () => {
        Alert.alert('Coming soon..')
    }

    const scoreHandler = (s: number) => {
        let temp = score + s;
        setScore(temp);
        console.log("temp > highScore", temp > highScore)
        if (temp > highScore) {
            setHighScore(temp);
            // TODO: Store high score in mmkv
        }

    }

    const reset = () => {
        // scoreHandler();
        const temp = Array.from({ length: n }, () => Array(n).fill(0));
        const i1 = getIndexForEmpty()
        const i2 = getIndexForEmpty()
        temp[i1.x][i1.y] = getNumber()
        temp[i2.x][i2.y] = getNumber()
        // if (i1.x === i2.x || i1.y === i2.y) {
        //     Alert.alert("Same value useLayoutEffect", `${i1.x} | ${i2.x} | ${i1.y} |  ${i2.y}`)
        // }
        return temp
    }

    const addTile = (matrix: number[][]) => {
        const temp = clone(matrix);
        const zeroPosition = [];
        for (let i = 0; i < temp.length; i++) {
            const row = temp[i];
            for (let j = 0; j < row.length; j++) {
                const col = row[j];
                if (col === 0) {
                    zeroPosition.push({ x: i, y: j })
                }
            }
        }
        // TODO: Handle condition for zeroPosition?.length === 0 
        if (zeroPosition?.length === 0) {
            Alert.alert("Game over")
            return clone(reset())
        } else {
            const value = zeroPosition[getRandomNumber(zeroPosition?.length)]
            temp[value.x][value.y] = getNumber();
        }
        return clone(temp)
    }

    const swipe = (d: direction) => {
        if (d === direction.LEFT || d === direction.RIGHT) {
            const temp = clone(matrix);
            for (let i = 0; i < temp.length; i++) {
                const row = temp[i];
                const nonZero = row?.filter((e: number) => e > 0);
                if (d === direction.LEFT) {
                    // First swipe all to same direction
                    temp[i] = [...nonZero, ...Array.from({ length: row?.length - nonZero?.length }, () => 0)]
                    const newRow = temp[i];
                    // Merge same tile at first position and change second position to 0
                    for (let j = 0; j < newRow.length; j++) {
                        if (newRow[j] > 0 && j < newRow?.length - 1) {
                            if (newRow[j] === newRow[j + 1]) {
                                temp[i][j] = newRow[j] * 2
                                temp[i][j + 1] = 0
                                scoreHandler(newRow[j])
                            }
                        }
                    }
                    // Again swipe all to remove empty spaces.
                    const row2 = temp[i];
                    const nonZero2 = newRow?.filter((e: number) => e > 0);
                    temp[i] = [...nonZero2, ...Array.from({ length: row2?.length - nonZero2?.length }, () => 0)]
                }
                if (d === direction.RIGHT) {
                    // First swipe all to same direction
                    temp[i] = [...Array.from({ length: row?.length - nonZero?.length }, () => 0), ...nonZero]
                    const newRow = temp[i];
                    // Merge same tile at first position and change second position to 0
                    for (let j = newRow.length - 1; j >= 0; j--) {
                        if (newRow[j] > 0 && j > 0) {
                            if (newRow[j] === newRow[j - 1]) {
                                temp[i][j] = newRow[j] * 2
                                temp[i][j - 1] = 0
                                scoreHandler(newRow[j])
                            }
                        }
                    }
                    // Again swipe all to remove empty spaces.
                    const row2 = temp[i];
                    const nonZero2 = newRow?.filter((e: number) => e > 0);
                    temp[i] = [...Array.from({ length: row2?.length - nonZero2?.length }, () => 0), ...nonZero2]
                }

            }
            setMatirx(clone(addTile(temp)))
        } else if (d === direction.UP || d === direction.DOWN) {
            const temp = clone(matrix);
            for (let i = 0; i < temp[0].length; i++) {
                const col = temp.map((row: number[]) => row[i]);
                const nonZero = col?.filter((e: number) => e > 0);
                let newRow: number[] = []
                if (d === direction.UP) {
                    const tempRow = [...nonZero, ...Array.from({ length: col?.length - nonZero?.length }, () => 0)]
                    for (let j = 0; j < tempRow.length; j++) {
                        if (tempRow[j] > 0 && j < tempRow?.length - 1) {
                            if (tempRow[j] === tempRow[j + 1]) {
                                tempRow[j] = tempRow[j] * 2
                                tempRow[j + 1] = 0
                                scoreHandler(tempRow[j])
                            }
                        }
                    }
                    const nonZero2 = tempRow?.filter((e: number) => e > 0);
                    newRow = [...nonZero2, ...Array.from({ length: tempRow?.length - nonZero2?.length }, () => 0)]
                }
                if (d === direction.DOWN) {
                    const tempRow = [...Array.from({ length: col?.length - nonZero?.length }, () => 0), ...nonZero]
                    for (let j = tempRow.length - 1; j >= 0; j--) {
                        if (tempRow[j] > 0 && j > 0) {
                            if (tempRow[j] === tempRow[j - 1]) {
                                tempRow[j] = tempRow[j] * 2
                                tempRow[j - 1] = 0
                                scoreHandler(tempRow[j])
                            }
                        }
                    }
                    const nonZero2 = tempRow?.filter((e: number) => e > 0);
                    newRow = [...Array.from({ length: tempRow?.length - nonZero2?.length }, () => 0), ...nonZero2]
                }
                temp.forEach((row: number[], index: number) => row[i] = newRow[index]);
            }
            setMatirx(clone(addTile(temp)))
        } else {
            Alert.alert("Invalid move")
        }

    }

    const pan = Gesture.Pan().minDistance(1)
        .onStart((event) => {
        })
        .onEnd((event) => {
            const angleRad = Math.atan2(event.translationY, event.translationX);
            const angleDeg = (angleRad * 180) / Math.PI;
            const normalizeAngle = (angleDeg + 360) % 360
            // console.log("angleRad", angleRad, angleDeg, normalizeAngle)
            if (normalizeAngle >= 45 && normalizeAngle <= 135) {
                console.log("Down")
                directionRef.current = direction.DOWN
                swipe(direction.DOWN)
            } else if (normalizeAngle >= 225 && normalizeAngle <= 315) {
                console.log("UP")
                directionRef.current = direction.UP
                swipe(direction.UP)
            } else if ((normalizeAngle > 315 && normalizeAngle <= 360 || (normalizeAngle >= 0 && normalizeAngle < 45))) {
                console.log("RIGHT")
                directionRef.current = direction.RIGHT
                swipe(direction.RIGHT)
            } else if (normalizeAngle > 135 && normalizeAngle < 225) {
                console.log("LEFT")
                directionRef.current = direction.LEFT
                swipe(direction.LEFT)
            }
        }).runOnJS(true);

    useLayoutEffect(() => {
        if (firstTimeRef.current) {
            const i1 = getIndexForEmpty()
            const i2 = getIndexForEmpty()
            const temp = [...matrix];
            temp[i1.x][i1.y] = getNumber()
            temp[i2.x][i2.y] = getNumber()
            if (i1.x === i2.x || i1.y === i2.y) {
                // Alert.alert("Same value useLayoutEffect", `${i1.x} | ${i2.x} | ${i1.y} |  ${i2.y}`)
            }
            setMatirx([...temp])
            firstTimeRef.current = false
        }
    }, []);

    useEffect(() => {
        console.log("matrix", matrix)
    }, [matrix])

    return (
        <SafeAreaView style={styles.safeArea}>

            <View style={styles.header}>
                <Text style={styles.title}>2048</Text>
                <View style={styles.scoreContainer}>
                    <View style={styles.scoreBox}>
                        <Text style={styles.scoreTitle}>SCORE</Text>
                        <Text style={styles.score}>{score}</Text>
                    </View>
                    <SizeBox width={10} />
                    <View style={styles.scoreBox}>
                        <Text style={styles.scoreTitle}>HIGH SCORE</Text>
                        <Text style={styles.score}>{highScore}</Text>
                    </View>
                </View>
            </View>
            <SizeBox height={20} />
            <View style={styles.header}>
                <TouchableOpacity hitSlop={5} activeOpacity={0.9} onPress={goToHome}>
                    <View style={styles.iconContainer}>
                        <HomeIcon />
                    </View>
                </TouchableOpacity>
                <View style={styles.scoreContainer}>
                    <TouchableOpacity hitSlop={5} activeOpacity={0.9} onPress={onPressUndo}>
                        <View style={styles.iconContainer}>
                            <UndoIcon />
                        </View>
                    </TouchableOpacity>
                    <SizeBox width={20} />
                    <TouchableOpacity hitSlop={5} activeOpacity={0.9} onPress={onPressReset}>
                        <View style={styles.iconContainer}>
                            <ReloadIcon />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <GestureDetector gesture={Gesture.Simultaneous(pan)}  >
                <View style={styles.container}>
                    <View style={styles.mainContainer}>
                        {matrix.map((row, i) => <View style={[styles.row,]} key={`row_${i}`}>
                            {row.map((col: any, j) => <Cell n={n} i={i} j={j} col={col} key={`col_${i}_${j}`} />)}
                        </View>)}
                    </View>
                </View>
            </GestureDetector>

            <SizeBox height={20} />
        </SafeAreaView>
    )
}

export default Game

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.bg
    },
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    mainContainer: {
        marginHorizontal: 20,
        width: SW - 40,
        height: SW - 40,
        backgroundColor: COLORS.grid,
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        backgroundColor: COLORS.grid
    },
    cell: {
        width: ((SW - 40) / 4) - 12.5,
        height: ((SW - 40) / 4) - 12.5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        margin: 5
    },
    text: {
        fontSize: 25
    },
    top: {
        borderTopWidth: 0
    },
    bottom: {
        borderBottomWidth: 0
    },
    left: {
        borderLeftWidth: 0
    },
    right: {
        borderRightWidth: 0
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    scoreContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontSize: 44,
        fontWeight: '500',
        color: COLORS.titleText
    },
    scoreBox: {
        backgroundColor: COLORS.grid,
        padding: 7,
        borderRadius: 7
    },
    scoreTitle: {
        fontSize: 12,
        fontWeight: '300',
        textAlign: 'center',
        color: COLORS.scoreText
    },
    score: {
        fontSize: 16,
        fontWeight: 600,
        color: COLORS.white,
        textAlign: 'center'
    },
    iconContainer: {
        backgroundColor: COLORS.grid,
        padding: 7,
        borderRadius: 7
    }
})