import { useNavigation } from "@react-navigation/native";
import { SearchNormal } from "iconsax-react-native";
import { TouchableOpacity } from "react-native";
import Colors from "../../constants/colors";
import Text from "../Text";

export default function Search() {

    const navigation = useNavigation();

    return(
        <TouchableOpacity style={{
            margin:15,
            padding:15,
            paddingHorizontal:20,
            backgroundColor:Colors.grey1+77,
            marginTop:0,
            flexDirection:"row",
            justifyContent:"space-between",
            borderRadius:100,
            alignItems:"center",
        }} onPress={()=>{
            navigation.navigate('Search' as never)
        }} >
            <Text color="textSecondary" >Search</Text>
            <SearchNormal variant="Bulk" size={24} color={Colors.textSecondary} />
        </TouchableOpacity>
    )
}