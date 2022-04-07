
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

function Details(props) {
    const data = props.route.params.data;

    const deleteData = () => {
        fetch(`http://20.20.1.181:19000/delete/${data.id}/`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            },
            // body: JSON.stringify({ title: title, body: body })
        })
            // .then(res => res.json())
            .then(data => {
                props.navigation.navigate('Home')
            })
            .catch(error => console.log(error))
    }

    return (
        <ScrollView>
            <View style={styles.viewStyle}>
                <Text style={{ fontSize: 20, color: 'red' }}>{data.title}</Text>
                <Text style={{ fontSize: 25, color: 'blue', marginTop: 5, marginBottom: 5 }}>{data.body}</Text>
                <Text style={{ fontSize: 15 }}>{data.time}</Text>
            </View>
            <View style={styles.btnStyle}>
                <Button
                    style={{ margin: 10 }}
                    mode="contained"
                    icon="update"
                    color='#494daf'
                    onPress={() => props.navigation.navigate('Update', { data: data })}
                >   Update </Button>

                <Button
                    style={{ margin: 10 }}
                    mode="contained"
                    icon="delete"
                    color='#494daf'
                    onPress={() => deleteData(data)}
                >   Delete </Button>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewStyle: {
        padding: 10,
        margin: 10,
        textAlign: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    btnStyle: {
        flexDirection: "row",
        justifyContent: 'space-around',
        margin: 10,
        padding: 10,
    }
}
)

export default Details