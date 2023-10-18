import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/core'

import { Ionicons } from '@expo/vector-icons'
import { Logo } from '../../components/logo'
import { FoodList } from '../../components/foodlist'
import api from '../../services/api'

export function Home(){
    const[inputValue, setInputValue] = useState("")
    const[foods, setFoods] = useState([])
    const navigation = useNavigation();

    useEffect(() => {
        async function fetchApi(){
            const response = await api.get("/foods")
            setFoods(response.data)
        }
        fetchApi();
    }, [])

    function handleSearch(){
        if(!inputValue) return;
        
        let input = inputValue
        setInputValue("")
        navigation.navigate("Search", { name : input })

    }

    return(
        <SafeAreaView style={styles.container}>
            <Logo/>
            <Text style={styles.title}>Encontre a Receita</Text>
            <Text style={styles.title}>Que Combina Com Você</Text>

            <View style={styles.form}>
                <TextInput 
                placeholder="Digite o nome na comida..."
                style={styles.input}
                value={inputValue}
                onChangeText={(text) => setInputValue(text)}
                onSubmitEditing={handleSearch}
                />

                <TouchableOpacity onPress={handleSearch}>
                    <Ionicons name="search" size={28} color="#4CBE6C"/>
                </TouchableOpacity>
            </View>

            <FlatList
                data={foods}
                keyExtractor={ (item) => String(item.id) }
                renderItem={ ({item}) => <FoodList data={item} /> }
                showsVerticalScrollIndicator={false}
            />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#F3F9FF',
        paddingTop: 36,
        paddingStart: 14,
        paddingEnd: 14
    },
    title:{
        fontSize: 26,
        fontWeight: "bold",
        color: "#0E0E0E"
    },
    input:{
        width: '90%',
        height: 54,
        maxWidth: '90%'
    },
    form:{
        backgroundColor: "#FFF",
        width: '100%',
        borderRadius: 8,
        marginTop: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#ECECEC",
        paddingLeft: 8,
        paddingRight: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})