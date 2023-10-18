import { useLayoutEffect, useState } from 'react'
import { View, Text, StyleSheet, Pressable, ScrollView, Image, Modal, Share } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { Entypo, AntDesign, Feather } from '@expo/vector-icons'
import { IngredientList } from '../../components/ingredientlist'
import { InstructionList } from '../../components/instructionlist'
import { VideoView } from '../../components/video'
import { isFavorite, makeFavorite, removeFavorite } from '../../utils/storage'

export function Detail(){
    const route = useRoute();
    const navigation = useNavigation();
    const [showVideo, setShowVideo] = useState(false);
    const [favorite, setFavorite] = useState(false)

    useLayoutEffect(() => {

        async function getStatusFavorite(){
            const recipeFavorite = await isFavorite(route.params?.data)
            setFavorite(recipeFavorite)
        }

        getStatusFavorite()

        navigation.setOptions({
            title: route.params?.data ? route.params?.data.name : "Detalhes da receita",
            headerRight: ()=> (
                <Pressable onPress={() => handleFavoriteRecipe(route.params?.data)}>
                    {favorite ? (
                        <Entypo 
                        name="heart" 
                        size={28}
                        color="#FF4141"
                        />
                    ) : (
                        <Entypo 
                        name="heart-outlined"
                        size={28}
                        color="#FF4141"
                    />
                    )}
                </Pressable>
            )
        })
    }, [navigation, route.params?.data, favorite])

    function handleOpenVideo(){
        setShowVideo(true);
    }

    async function handleFavoriteRecipe(recipe){
        if(favorite){
            await removeFavorite(recipe.id)
            setFavorite(false);
        } else{
            makeFavorite("@appreceitas", recipe)
            setFavorite(true);
        }
    }

    async function shareRecipe(){
        try{
            await Share.share({
               url: "https://expo.dev",
               message: `Receita: ${route.params?.data.name}\nIngredientes: ${route.params?.data.total_ingredients}\nVi lá no app Receita Fácil!`
            })
        }catch(error){
            console.log(error)
        }
    }

    return(
        <ScrollView contentContainerStyle={{ paddingBottom: 14 }} style={styles.container} showsVerticalScrollIndicator={false}>
            <Pressable onPress={handleOpenVideo} >
                <View style={styles.playicon}>
                    <AntDesign name="playcircleo" size={50} color={"#FAFAFA"} />
                </View>
                <Image
                    source={{ uri: route.params?.data.cover }}
                    style={styles.cover}
                />
            </Pressable>
            
            <View style={styles.headerDetails}>
                <View>
                    <Text style={styles.title}>{route.params?.data.name}</Text>
                    <Text style={styles.ingredients} >{route.params?.data.total_ingredients} Ingredientes</Text>
                </View>
            <Pressable onPress={shareRecipe} >
                <Feather name="share-2" size={24} color={"#121212"} />
            </Pressable>
            </View>

            {route.params?.data.ingredients.map((item) => (
                <IngredientList key={item.id} data={item} />
            ) )}

            <View style={styles.howTitle} >
                <Text style={styles.howText} >Modo de preparo</Text>
                <Feather
                    name="arrow-down"
                    size={24}
                    color={"#FFF"}
                />
            </View>

            {route.params?.data.instructions.map((item, index) => (
                <InstructionList key={item.id} data={item} index={index} />
            ) )}

            <Modal visible={showVideo} animationType="slide" >
                <VideoView
                    handleClose={() => setShowVideo(false)}
                    videoUrl={route.params?.data.video}
                />
            </Modal>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#F3F9FF',
        paddingTop: 14,
        paddingStart: 14,
        paddingEnd: 14
    },
    cover:{
        height: 200,
        borderRadius: 14,
        width: '100%'
    },
    playicon:{
        position: 'absolute',
        zIndex: 9,
        top: 0, left: 0, right: 0, bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title:{
        fontSize: 18,
        marginTop: 14,
        fontWeight: 'bold',
        color: "#000",
        marginBottom: 4
    },
    ingredients:{
        marginBottom: 14,
        fontSize: 16
    },
    headerDetails:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 10,
        marginBottom: 14,
    },
    howTitle:{
        backgroundColor: "#4CBE6C",
        marginTop: 14,
        padding: 12,
        borderRadius: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    howText:{
        fontSize: 18,
        fontWeight: '500',
        color: "#FFF"
    }
})