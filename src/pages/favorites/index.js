import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native'
import { getFavorite } from '../../utils/storage'
import { useIsFocused } from '@react-navigation/native'
import { FoodList } from '../../components/foodlist'
import { Logo } from '../../components/logo'

export function Favorites(){
    const [recipes, setRecipes] = useState([]);
    const isFocused = useIsFocused();

    useEffect( () => {

    let isActive = true;

    async function getRecipe(){
        const result = await getFavorite("@appreceitas")
        if(isActive){
            setRecipes(result)
        }
    }

    if(isActive){
        getRecipe();
    }

    return () => {
        isActive = false;
    }

    }, [isFocused])

    

    return(
        <SafeAreaView style={styles.container}>
            <Logo/>
            <Text style={styles.title}>As Receitas Que Você Amou</Text>

            <FlatList
                showsVerticalScrollIndicator={false}
                style={{marginTop: 14}}
                data={recipes}
                keyExtractor={ (item) => String(item.id) }
                renderItem={ ({item}) => <FoodList data={item} /> }
                ListEmptyComponent={ () => <Text>Você ainda não tem nenhuma receita salva</Text> }
            
            />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#F3F9FF',
        paddingStart: 14,
        paddingEnd: 14,
        paddingTop: 36

    },
    title:{
        color: '#000',
        fontWeight: 'bold',
        fontSize: 26
    }
})