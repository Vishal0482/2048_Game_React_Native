import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { interpolate, SharedValue, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { getColor, getRandomColor, SW, TEST_MATRIX } from '../utils/constants'
import { MergeAnimType } from '../utils/types'

interface CellProps {
    i: number
    j: number
    col: any
    n: number
    animObj: MergeAnimType
}

const Cell = (props: CellProps) => {
    const space = useSharedValue(interpolate(props?.n, [4, 8], [12.5, 10]));
    const margin = useSharedValue(interpolate(props?.n, [4, 8], [5, 4.5]));
    // const positionX = useSharedValue(0);
    // const positionY = useSharedValue(0);
    const scale = useSharedValue(1);

    const animatedStyles = useAnimatedStyle(() => {
        return {
            width: ((SW - 40) / props?.n) - space.value,
            height: ((SW - 40) / props?.n) - space.value,
            margin: margin.value,
            transform: [
                // { translateX: positionX.value },
                // { translateY: positionY.value }, 
                { scale: withTiming(scale.value) }
            ],
        }
    })

    // useEffect(() => {
    //     if (props?.animObj?.isMerging === 1) {
    //         console.log("animObj", props?.i, props?.j, props?.animObj)
    //         scale.value = 1.2;
    //         setTimeout(() => {
    //             scale.value = 1;
    //         }, 300);
    //     }
    // }, [props?.animObj]);


    return (
        <Animated.View style={[styles.cell, { backgroundColor: getColor(props?.col).backgroundColor }, animatedStyles]} >
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