

import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';

class ClassHome extends Component { 

    state = {
        name: "Zahid Hossain."
    }


    render() {
        return (
            <View>
                <Text>Class Home</Text>
                <Text>{this.state.name}</Text>
                <Button title="CLick Me" onPress={() => this.setState({ name: "This is changed." })} />
            </View>
        )
    }
}

export default ClassHome