import axios from "axios";
import { Building, Buildings, Check, DocumentFavorite, EmojiSad, Paperclip, SearchNormal1, TickCircle } from "iconsax-react-native";
import { useRef, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import Input from "../components/Input";
import Text from "../components/Text";
import Colors from "../constants/colors";
import LottieView from 'lottie-react-native';
import layouts from "../constants/layouts";
import { useDispatch, useSelector } from "react-redux";
import { add,remove } from "../redux/actions/list";

export default function Search() {

    const list = useSelector((state:any) => state.list.value);
    const dispatch = useDispatch();

    const [stocks,setStocks] = useState<any[]>([]);
    const [isEmpty,setIsEmpty] = useState<boolean>(false);
    const [isSearch,setIsSearch] = useState<boolean>(false);
    const [text,setText] = useState<string>("");

    let timeout:any;

    const SearchStocks = (text:string)=>{

        setIsEmpty(false);

        axios.get('https://api.twelvedata.com/symbol_search',{
            params:{
                symbol:text,
            }
        })
        .then(response=>{

            setIsSearch(false)

            if (text == "") {
                setStocks([]);
                return
            }

            if (response.data.data.length < 1) {
                setIsEmpty(true);
                return
            }

            setStocks(response.data.data)
        })
        .catch(e=>{
            console.log(e);
        })
    }

    const stockList = ()=>{
        return(
            stocks.map((v:any,i)=>{

                const current = list.filter((val:any)=>{
                    return v.symbol+":"+v.exchange == val.symbol+":"+val.exchange
                })

                return(
                    <TouchableOpacity key={i} style={{
                        paddingVertical:10,
                        borderBottomWidth:1,
                        borderBottomColor:Colors.grey1,
                        flexDirection:"row",
                        alignItems:"center",
                        justifyContent:"space-between"
                    }} onPress={()=>{
                        if (current.length < 1) {
                            dispatch(add(v))
                        }else{
                            dispatch(remove(v))
                        }

                    }} >
                        <View style={{
                            flexDirection:"row",
                        }} >
                            <View style={{
                                width:50,
                                height:50,
                                backgroundColor:Colors.primary,
                                borderRadius:100,
                                marginRight:15,
                                alignItems:"center",
                                justifyContent:"center"
                            }} >
                                <Buildings variant="Bold" color={Colors.white} />
                            </View>
                        
                            <View style={{
                                width:layouts.window.width - 200
                            }} >
                                <View style={{
                                    flexDirection:"row",
                                }} >
                                    <View  style={{
                                        padding:2,
                                        backgroundColor:Colors.grey1,
                                        paddingHorizontal:8,
                                        borderRadius:10,
                                        marginRight:10,
                                    }} >
                                        <Text color="text" size={10} >{v.symbol}:{v.exchange}</Text>
                                    </View>
                                </View>
                                <Text size={18} weight="semi" >{v.instrument_name}</Text>
                                <Text size={10} color="textSecondary" >{v.country}</Text>
                            </View>
                        </View>
                        <TickCircle variant="Bold" size={24} color={current.length < 1 ? Colors.grey1 : Colors.primary} />
                    </TouchableOpacity>
                )
            })
        )
    }

    const EmptyList = ()=>{
        return(
            <View style={{
                alignItems:"center",
                paddingHorizontal:15,
            }} >
                <View style={{
                    width:100,
                    height:100,
                    borderWidth:1,
                    alignItems:"center",
                    justifyContent:"center",
                    borderRadius:100,
                    borderColor:Colors.grey1,
                    marginVertical:20,
                }} >
                    <EmojiSad color={Colors.primary} size={50} variant="Bold" />
                </View>
                <Text size={20} weight="semi" style={{textAlign:"center"}} >Can't find {text}</Text>
                <Text color="textSecondary" style={{textAlign:"center"}}>Check your input again, or try another input</Text>
            </View>
        )
    }

    const searchList = ()=>{
        return(
            <View style={{
                alignItems:"center",
                paddingHorizontal:15,
            }} >
                <LottieView
                    source={require('../assets/search.json')}
                    autoSize
                    autoPlay
                    style={{
                        position:"relative",
                        width:100,
                        borderWidth:1,
                        alignItems:"center",
                        justifyContent:"center",
                        borderRadius:100,
                        borderColor:Colors.grey1,
                        marginVertical:20,
                    }}
                />
                <Text size={20} weight="semi">Trying to find {text}</Text>
            </View>
        )
    }

    return(
        <ScrollView style={{
            flex:1,
            backgroundColor:Colors.white,
        }} >
            <View style={{
                padding:15,
            }} >
                <Input
                    label="Search"
                    message="Try to search your stocks symbol, e.g: AAPL"
                    onChangeText={(text)=>{
                        setText(text);
                        setIsSearch(true);
                        clearTimeout(timeout)

                        timeout = setTimeout(() => {
                            SearchStocks(text)
                        }, 1000);
                    }}
                    containerStyle={{
                        marginBottom:15,
                    }}
                />
                {stocks.length > 0 && !isEmpty && !isSearch && stockList()}
                {isEmpty && !isSearch && EmptyList()}
                {isSearch && searchList()}
            </View>
        </ScrollView>
    )
}