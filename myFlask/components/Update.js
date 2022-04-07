

import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';


function Update(props) {

    const data = props.route.params.data;

    const [title, setTitle] = useState(data.title)
    const [body, setBody] = useState(data.body)

    const updateData = () => {
        fetch(`http://20.20.1.181:19000/update/${data.id}/`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ title: title, body: body })
        })
            .then(res => res.json())
            .then(data => {
                props.navigation.navigate('Home', { data: data })
            })
            .catch(error => console.log(error))
    }


    return (
        <View >
            <TextInput style={styles.inputStyle}
                label="Title"
                value={title}
                mode="outlined"
                onChangeText={text => setTitle(text)}
            />
            <TextInput style={{ margin: 10 }}
                label="Description"
                value={body}
                mode="outlined"
                multiline
                numberOfLines={10}
                onChangeText={text => setBody(text)}
            />

            <Button
                style={{ margin: 10 }}
                mode="contained"
                icon="pencil"
                color='#494daf'
                onPress={() => updateData()}
            >   Update </Button>



        </View>
    )
}


const styles = StyleSheet.create({

    inputStyle: {
        margin: 10,
        padding: 8,
        backgroundColor: '#fff',
        borderRadius: 10,

    },


});



export default Update