import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'

export function FoodList({ data }){
    return(
        <TouchableOpacity activeOpacity={0.85} style={styles.container}>
            <Image
                source={{ uri:data.cover }}
                style={styles.cover}
            />
            <View>
                <Text>{data.name}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        marginBottom: 14,
    },
    cover:{
        width: '100%',
        height: 200,
        borderRadius: 14
    }
})