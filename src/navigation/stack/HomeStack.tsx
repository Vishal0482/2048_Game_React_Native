import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Game from '../../screen/Game/Game';
import { RootStack } from '../../utils/types';
import Home from '../../screen/Home/Home';

const HomeStack = () => {
    const Stack = createNativeStackNavigator<RootStack>();
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Game" component={Game} />
        </Stack.Navigator>
    )
}

export default HomeStack

const styles = StyleSheet.create({})