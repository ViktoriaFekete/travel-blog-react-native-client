import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { StackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

import WelcomePage from './WelcomePage';
import Login from './Login';
import Registration from './Registration';
import MainFrame from '../navigation/MainFrame';

const WelcomeStack = createStackNavigator({
    WelcomePage: { screen: WelcomePage },
    Login: { screen: Login },
    Registration: { screen: Registration },
})

const Screens = createSwitchNavigator({
    WelcomePage: WelcomePage,
    WelcomeStack: WelcomeStack,
    MainFrame: { screen: MainFrame }
})

export default createAppContainer(Screens);
