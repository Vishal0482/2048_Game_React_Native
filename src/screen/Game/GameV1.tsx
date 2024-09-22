import { Platform, SafeAreaView, StyleSheet, TextInput, View, ViewStyle } from 'react-native'
import React, { MutableRefObject, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { getColor, getRandomColor, SW, TEST_MATRIX } from '../../utils/constants'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { useAnimatedProps, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { direction } from '../../utils/enum'
import Cell from '../../components/Cell'
import { Box, Canvas, Group, matchFont, rect, Rect, RoundedRect, rrect, Skia, Text, useFont } from '@shopify/react-native-skia'

const fontFamily = Platform.select({ ios: "Helvetica", default: "serif" });
const fontStyle: any = {
    fontFamily,
    fontSize: 32,
    // fontStyle: "italic",
    // fontWeight: "bold",
};
const font = matchFont(fontStyle);

const Game = () => {
    // const fontSize = 32;
    // const font = useFont(require("/Users/vishalparmar/Projects/Personal/ReactNative/Game_2048/src/assets/fonts/Inter-Regular.ttf"), fontSize);
    const getColor2 = () => `rgb(${(Math.random() * 1000).toFixed(0)}, ${(Math.random() * 1000).toFixed(0)}, ${(Math.random() * 1000).toFixed(0)})`
    const n = 4;
    const matrixRef = useRef<number[][]>(Array(n).fill(Array(n).fill(0)))
    const [matrix, setMatirx] = useState<number[][]>(Array(n).fill(Array(n).fill(0)));
    const matrixRefRef = useRef<MutableRefObject<TextInput>[][]>(Array(n).fill(Array(n).fill(useRef<TextInput>(null))))
    const matrixStyleRef = useRef<MutableRefObject<ViewStyle>[][]>(Array(n).fill(Array(n).fill(useRef<ViewStyle>(useAnimatedStyle(() => ({}))))))
    // console.log("matrix", matrixRef)
    const startTranslationX = useSharedValue(0);
    const startTranslationY = useSharedValue(0);
    const endTranslationX = useSharedValue(0);
    const endTranslationY = useSharedValue(0);
    const directionRef = useRef(direction.NONE);
    const translate = useSharedValue(0);
    const matrixValue = useSharedValue<number[][]>(Array(n).fill(Array(n).fill(0)));
    const animatedStyles = useAnimatedStyle(() => {

        return {
            transform: [
                { translateX: translate.value }
            ]
        }

    })

    const move = () => {
        translate.value = ((SW - 40) / 4) - 12.5
    }

    const pan = Gesture.Pan().minDistance(1)
        .onStart((event) => {
            // console.log("start event", event)
            // startTranslationX.value = event.translationX;
            // startTranslationY.value = event.translationY;
        })
        .onEnd((event) => {
            // console.log("update event", event)
            // startTranslationX.value = event.translationX;
            // startTranslationY.value = event.translationY;
            // const angleRad = Math.atan2(event.translationY, event.translationX);
            // const angleDeg = (angleRad * 180) / Math.PI;
            // const normalizeAngle = (angleDeg + 360) % 360
            // console.log("angleRad", angleRad, angleDeg, normalizeAngle)
            // if (normalizeAngle >= 45 && normalizeAngle <= 135) {
            //     console.log("Down")
            //     directionRef.current = direction.DOWN
            // } else if (normalizeAngle >= 225 && normalizeAngle <= 315) {
            //     console.log("UP")
            //     directionRef.current = direction.UP
            // } else if ((normalizeAngle > 315 && normalizeAngle <= 360 || (normalizeAngle >= 0 && normalizeAngle < 45))) {
            //     console.log("RIGHT")
            //     directionRef.current = direction.RIGHT
            //     // translate.value = ((SW - 40) / 4) - 5

            // } else if (normalizeAngle > 135 && normalizeAngle < 225) {
            //     console.log("LEFT")
            //     directionRef.current = direction.LEFT
            //     // translate.value = -((SW - 40) / 4) + 5
            // }
            // const temp = [...matrix];
            // temp[0][0] = 2
            // setMatirx([...temp])
        })

    const getRandomIndexForInital = () => {

    }

    const initializeGrid = () => {
        try {


            // matrixRefRef.current[0][0].current.setNativeProps({ text: '2' })

        } catch (error) {
            console.log("initializeGrid", error)
        }
    }

    useLayoutEffect(() => {

    }, [])

    useEffect(() => {
        // const temp = matrixValue.value
        // temp[0][0] = 2
        // temp[3][0] = 4
        // matrixValue.value = temp
        // matrixRefRef.current[1][0].current.setNativeProps({ text: '2' })
        setTimeout(() => {
            console.log("timeout")
            matrixRefRef.current[1][3].current.setNativeProps({ text: '4' })

        }, 2000)
    }, [])

    return (
        <SafeAreaView style={styles.container}>

            {/* <View style={{ height: 80, width: 200, }}></View> */}

            <GestureDetector gesture={Gesture.Simultaneous(pan)}  >
                <View style={styles.mainContainer}>
                    {matrix.map((row, i) => <View style={[styles.row,]} key={`row_${i}`}>
                        {row.map((col: any, j) => <Animated.View style={[styles.cell, { backgroundColor: getColor(col).backgroundColor }, animatedStyles]} key={`col_${i}_${j}`}>
                            <TextInput ref={matrixRefRef.current[i][j]} style={styles.text} value={`${i},${j},${col}`} editable={false} />
                        </Animated.View>)}
                    </View>)}
                </View>
            </GestureDetector>

            {/* <GestureDetector gesture={Gesture.Simultaneous(pan)}  >
                <Canvas style={styles.mainContainer}>
                    {matrix?.map((row, i) => row?.map((col: any, j) => <Group key={`col_${i}_${j}`}>
                        <RoundedRect
                            r={10}
                            x={i * styles.cell.width * 1.1 + 12.5}
                            y={j * styles.cell.height * 1.1 + 12.5}
                            width={styles.cell.width}
                            height={styles.cell.height}
                            color={getColor(col).backgroundColor} />
                        <Text opacity={matrixValue.value[i][j] === 0 ? 0 : 1} font={font} text={matrixValue.value[i][j].toString()}
                            x={i * styles.cell.width * 1.1 + 12.5 + (styles.cell.width / 2 - 8)}
                            y={j * styles.cell.height * 1.1 + 12.5 + (styles.cell.height / 2 + 8)}
                        />
                    </Group>))}
                </Canvas>
            </GestureDetector> */}

            {/* <View style={{ height: 80, width: 200 }}></View> */}

        </SafeAreaView>
    )
}

export default Game

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    mainContainer: {
        marginHorizontal: 20,
        width: SW - 40,
        height: SW - 40,
        backgroundColor: 'pink',
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        backgroundColor: 'pink'
    },
    cell: {
        width: ((SW - 40) / 4) - 12.5,
        height: ((SW - 40) / 4) - 12.5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        borderColor: 'pink',
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

})