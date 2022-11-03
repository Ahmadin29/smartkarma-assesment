import { useNavigation } from "@react-navigation/native";
import { AddCircle, Buildings, CloseCircle, FavoriteChart, TickCircle } from "iconsax-react-native";
import moment from "moment";
import { useEffect, useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../constants/colors";
import layouts from "../../constants/layouts";
import { remove } from "../../redux/actions/list";
import Button from "../Button";
import Text from "../Text";

export default function WatchlistWidget() {

    const list = useSelector((state:any) => state.list.value);

    const [watchlist,setWatchlist] = useState<any>([])

    const navigation = useNavigation();

    const dispatch = useDispatch()

    useEffect(()=>{
        stream()
    },[list])

    const stream = ()=>{

        setWatchlist([])

        const socket = new WebSocket('wss://ws.twelvedata.com/v1/quotes/price?apikey=579f4b297a6a4a53b6ae58c3339e916e')

        const symbols = list.map((v:any)=>{
            return v.symbol+":"+v.exchange
        })

        socket.onopen = async () => {
            const data = {
                "action": "subscribe", 
                "params": {
                    "symbols": symbols.join(",")
                }
            }

            socket.send(JSON.stringify(data))
        };

        socket.onmessage = (e)=>{

            const data = JSON.parse(e.data);

            console.log(data);
            

            if (data.event == 'price') {
                const newdata = [...watchlist,data]

                setWatchlist(newdata);
            }
        }
    }

    const ListEmpty = ()=>{
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
                    <FavoriteChart color={Colors.primary} size={50} variant="Bold" />
                </View>
                <Text size={20} weight="semi" style={{textAlign:"center"}} >Nothing to watch</Text>
                <Text color="textSecondary" style={{textAlign:"center"}}>You don't have anything to watch, Try to add your favorite stocks to watch their prices</Text>
                <Button label="Find the stock" style={{
                    marginTop:20,
                }} onPress={()=>{
                    navigation.navigate('Search' as never)
                }} />
            </View>
        )
    }

    const renderList = ()=>{
        return(
            watchlist.map((v:any,i:any)=>{
                return(
                    <TouchableOpacity key={i} style={{
                        paddingVertical:10,
                        borderBottomWidth:1,
                        borderBottomColor:Colors.grey1,
                        flexDirection:"row",
                        alignItems:"center",
                        justifyContent:"space-between"
                    }} onPress={()=>{
                        Alert.alert('Attention!','Are you sure to remove this stock from your watchlist',[
                            {
                                text:'Yes, Delete',
                                onPress:()=>{
                                    dispatch(remove(v))
                                }
                            },
                            {
                                text:'Cancel'
                            }
                        ])
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
                                <Text size={18} weight="semi" >{v.price}</Text>
                                <Text size={10} color="textSecondary" >{moment.unix(v.timestamp).format('DD/MM/YYYY HH:mm:ss')}</Text>
                            </View>
                        </View>
                        <CloseCircle variant="Bold" size={24} color={Colors.grey1} />
                    </TouchableOpacity>
                )
            })
        )
    }

    return(
        <View style={{
            padding:15,
            paddingVertical:0,
        }} >
            <View style={{
                flexDirection:"row",
                justifyContent:"space-between",
                alignItems:"center"
            }} >
                <Text weight="semi" size={18} >Watchlist</Text>
                <TouchableOpacity style={{
                    padding:5,
                }} onPress={()=>{
                    navigation.navigate('Search' as never)
                }}>
                    <AddCircle color={Colors.textSecondary} size={25} variant="Bold" />
                </TouchableOpacity>
            </View>
            {list.length < 1 && ListEmpty()}
            {list.length > 0 && renderList()}
        </View>
    )
}