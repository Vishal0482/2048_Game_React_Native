import { Dimensions } from "react-native";

export const { height: SH, width: SW } = Dimensions.get("screen");
export const { height: WH, width: WW } = Dimensions.get("window");

export const TEST_MATRIX = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
]

export const getRandomColor = () => `rgb(${(Math.random() * 1000).toFixed(0)}, ${(Math.random() * 1000).toFixed(0)}, ${(Math.random() * 1000).toFixed(0)})`

export const COLORS = {
    grid: '#bbada0',
    titleText: '#68625b',
    bg: '#faf7ed',
    white: '#FFFFFF',
    scoreText: '#d8cade',
    orange: '#e45c37'
}

const TILE_COLOR = {
    0: { backgroundColor: '#cdc1b4', textColor: '#cdc1b4' },
    2: { backgroundColor: '#eee4da', textColor: '#776e65' },
    4: { backgroundColor: '#ede0c8', textColor: '#776e65' },
    8: { backgroundColor: '#f2b179', textColor: '#f9f6f2' },
    16: { backgroundColor: '#f59563', textColor: '#f9f6f2' },
    32: { backgroundColor: '#f67c5f', textColor: '#f9f6f2' },
    64: { backgroundColor: '#f65e3b', textColor: '#f9f6f2' },
    128: { backgroundColor: '#edcf72', textColor: '#f9f6f2' },
    256: { backgroundColor: '#edcc61', textColor: '#f9f6f2' },
    512: { backgroundColor: '#edc850', textColor: '#f9f6f2' },
    1024: { backgroundColor: '#edc53f', textColor: '#f9f6f2' },
    2048: { backgroundColor: '#edc22e', textColor: '#f9f6f2' },
    'greater': { backgroundColor: '#3c3a32', textColor: '#f9f6f2' }, // For values greater than 2048
};

export const getColor = (n: keyof typeof TILE_COLOR) => TILE_COLOR[n]

export const clone = (data: any) => {
    return JSON.parse(JSON.stringify(data));
}