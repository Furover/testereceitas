import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import { getFavorite } from '../../utils/storage'
import { useIsFocused } from '@react-navigation/native'

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
        
    }

    }, [isFocused])

    

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title} >Página de Favoritos</Text>

            {recipes.length === 0 && (
                <Text>Você ainda não tem nenhuma receita salva</Text>
            )}

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
        fontSize: 24
    }
})