import { View, Text, StyleSheet, FlatList } from 'react-native'
import { useRoute } from '@react-navigation/core'
import { useState, useEffect } from 'react'

import api from '../../services/api';
import { FoodList } from '../../components/foodlist';

export function Search(){
    const route = useRoute();
    const [recipes, setRecipes] = useState([])

    useEffect( () => {
        async function fetchRecipes(){
            const response = await api.get(`/foods?name_like=${route.params?.name}`)
            
            setRecipes(response.data);
        }

        fetchRecipes();

    }, [route.params?.name] )

    return(
        <View style={styles.container}>

            <FlatList
                showsVerticalScrollIndicator={false}
                style={{marginTop: 14}}
                data={recipes}
                keyExtractor={ (item) => String(item.id) }
                renderItem={ ({item}) => <FoodList data={item} /> }
                ListEmptyComponent={ () => <Text style={styles.notFound} >Não encontramos o que você está procurando :( </Text> }
            
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#F3F9FF",
        paddingStart: 14,
        paddingEnd: 14,
        paddingTop: 14
    },
    notFound:{
        fontSize: 16,
        textAlign: 'center'
    }
})