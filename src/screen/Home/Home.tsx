import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { COLORS } from '../../utils/constants'
import PlayIcon from '../../assets/icons/PlayIcon'
import { IMAGE } from '../../assets/images'
import SizeBox from '../../components/SizeBox'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStack } from '../../utils/types'

type HomeProps = NativeStackScreenProps<RootStack, 'Home'>

const Home = (props: HomeProps) => {
    const gridRef = useRef<number>(4);
    const [grid, setGrid] = useState<number>(4);

    const goToGame = () => {
        props?.navigation?.navigate('Game', { n: gridRef.current })
    }

    const onPressFour = () => {
        gridRef.current = 4
        setGrid(4)
    }

    const onPressFive = () => {
        gridRef.current = 5
        setGrid(5)
    }

    const onPressSix = () => {
        gridRef.current = 6
        setGrid(6)
    }

    const onPressEight = () => {
        gridRef.current = 8
        setGrid(8)
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={[styles.imageContainer, grid === 4 && styles.active]}>
                <TouchableOpacity hitSlop={5} activeOpacity={0.9} onPress={onPressFour}>
                    <Image resizeMode='contain' source={IMAGE.Four} style={styles.image} />
                    <Text style={styles.text}>4X4</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.imageContainer, grid === 5 && styles.active]}>
                <TouchableOpacity hitSlop={5} activeOpacity={0.9} onPress={onPressFive}>
                    <Image resizeMode='contain' source={IMAGE.Five} style={styles.image} />
                    <Text style={styles.text}>5X5</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.imageContainer, grid === 6 && styles.active]}>
                <TouchableOpacity hitSlop={5} activeOpacity={0.9} onPress={onPressSix}>
                    <Image resizeMode='contain' source={IMAGE.Five} style={styles.image} />
                    <Text style={styles.text}>6X6</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.imageContainer, grid === 8 && styles.active]}>
                <TouchableOpacity hitSlop={5} activeOpacity={0.9} onPress={onPressEight}>
                    <Image resizeMode='contain' source={IMAGE.Eight} style={styles.image} />
                    <Text style={styles.text}>8X8</Text>
                </TouchableOpacity>
            </View>
            <SizeBox height={40} />
            <TouchableOpacity hitSlop={5} activeOpacity={0.9} onPress={goToGame}>
                <View style={styles.iconContainer}>
                    <PlayIcon style={styles.icon} />
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.bg,
        alignItems: 'center'
    },
    iconContainer: {
        backgroundColor: COLORS.orange,
        padding: 15,
        borderRadius: 7
    },
    icon: {
        transform: [{ scale: 2 }]
    },
    image: {
        height: 100,
        aspectRatio: 1
    },
    text: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.titleText,
        textAlign: 'center',
        marginTop: 5
    },
    imageContainer: {
        marginTop: 10,
        opacity: 0.4
    },
    active: {
        opacity: 1
    }
})