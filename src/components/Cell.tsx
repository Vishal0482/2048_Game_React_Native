import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated'
import { getColor, getRandomColor, SW, TEST_MATRIX } from '../utils/constants'
import { TextInput } from 'react-native-gesture-handler'

interface CellProps {
    i: number
    j: number
    col: any
    n: number
}

const Cell = (props: CellProps) => {

    const animatedStyles = useAnimatedStyle(() => {
        return {
            width: ((SW - 40) / props?.n) - 12.5,
            height: ((SW - 40) / props?.n) - 12.5,
        }
    })

    return (
        <Animated.View style={[styles.cell, { backgroundColor: getColor(props?.col).backgroundColor }, animatedStyles]} >
            {/* <TextInput style={[styles.text, { color: "red" }]} value={props?.col} editable={false} /> */}
            <Text style={[styles.text, { color: getColor(props?.col).textColor }, { fontSize: 128 / props?.n }]}>{props?.col}</Text>
        </Animated.View>
    )
}

export default Cell

const styles = StyleSheet.create({
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
        fontSize: 32
    },
})