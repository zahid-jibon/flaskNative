import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Card, FAB } from 'react-native-paper';

function home(props) {


    const [data, setData] = useState([])
    const [loading, setIsLoading] = useState(true)

    const loadData = () => {
        fetch('http://20.20.1.181:19000/get', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                setData(data)
                setIsLoading(false)
            })
            .catch(error => console.log(error))
    }


    useEffect(() => {
        loadData()

    }, [])

    const clickedItems = (data) => {
        props.navigation.navigate('Details', { data: data })
    }


    const renderData = (item) => {
        return (
            <Card style={styles.cardStyle}>
                <Text style={{ fontSize: 20 }} onPress={() => clickedItems(item)}> {item.title} </Text>
                <Text> {item.body} </Text>
            </Card>
        )
    }
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={data}
                renderItem={({ item }) => {
                    return renderData(item)
                }}
                onRefresh={() => loadData()}
                refreshing={loading}
                keyExtractor={item => `${item.id}`}
            />

            <FAB
                style={styles.fab}
                small={false}
                icon="plus"
                theme={{ colors: { accent: '#000' } }}
                onPress={() => props.navigation.navigate('Create')}
            />

        </View>
    )
}

const styles = StyleSheet.create({

    cardStyle: {
        margin: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        textAlign: 'center',
        alignItems: 'center',
        fontSize: 20,
    },

    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    }
});



export default home