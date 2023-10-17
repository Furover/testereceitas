import { View, Text, StyleSheet } from 'react-native'

export function InstructionList({data, index}){

    return(
        <View style={styles.container}>
            <Text style={styles.count}>{index + 1}</Text>
            <Text style={styles.name}>{data.text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginBottom: 30,
        flexDirection: 'row',
        padding: 8
    },
    name:{
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 20
    },
    count:{
        fontWeight: 'bold',
        fontSize: 18
    }
})
