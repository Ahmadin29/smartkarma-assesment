import { useNavigation } from "@react-navigation/native";
import { AddCircle, ArrowCircleDown, ArrowCircleDown2, ArrowCircleUp2, Buildings, CloseCircle, FavoriteChart, Sort, TickCircle } from "iconsax-react-native";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../constants/colors";
import layouts from "../../constants/layouts";
import { ordering, remove } from "../../redux/actions/list";
import { addWatchlist } from "../../redux/actions/watchlist";
import Button from "../Button";
import Text from "../Text";
import BottomSheet from 'react-native-raw-bottom-sheet'

export default function WatchlistWidget() {

    const list = useSelector((state:any) => state.list.value);
    const watchlist = useSelector((state:any) => state.watchlist.value);

    const navigation = useNavigation();

    const dispatch = useDispatch()

    useEffect(()=>{
        stream()
    },[list])

    const stream = ()=>{

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

            // console.log(e.data);
            
            if (data.event == 'price') {
                console.log('update availble',data.symbol,data.price,data.timestamp);
                
                dispatch(addWatchlist(data))
                
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
            list.map((v:any,i:any)=>{

                const prices = watchlist.filter((val:any)=>{
                    return val.symbol == v.symbol
                })

                const price = prices && prices[prices.length - 1];

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
                                        <Text color="text" size={10} >{v.symbol}</Text>
                                    </View>
                                </View>
                                <Text size={18} weight="semi" >{price ? `${price.price} USD`: 'Loading data'}</Text>
                                <Text size={10} color="textSecondary" >{price ? moment.unix(price.timestamp).format('DD/MM/YYYY HH:mm:ss') : '-'}</Text>
                            </View>
                        </View>
                        <CloseCircle variant="Bold" size={24} color={Colors.grey1} />
                    </TouchableOpacity>
                )
            })
        )
    }

    let sheetRef = useRef<any>(null)

    const sortPrice = (order:any)=>{
        const unique:any = []

        list.map((v:any)=>{
            const data = watchlist.filter((val:any)=>{
                return val.symbol == v.symbol;
            })

            const price = data && data[data.length - 1];

            unique.push(price)
        })

        const sortedPrice = unique.sort((a:any,b:any)=>{
            return order == 'desc' ? a.price > b.price ? 1 : -1 : a.price < b.price ? 1 : -1
        })

        const sortedList:any = []

        sortedPrice.map((v:any)=>{
            const selected = list.find((data:any)=>{
                return data.symbol == v.symbol
            })

            sortedList.push(selected)
        })

        dispatch(ordering(sortedList))
    }

    const sortName = (order:any)=>{
        const data = [...list];

        const sorted = data.sort((a:any,b:any)=>{
            return order == 'asc' ? a.symbol < b.symbol ? 1 : -1 : a.symbol > b.symbol ? 1 : -1
        })

        dispatch(ordering(sorted))
    }

    const sortSheet = ()=>{
        return(
            <BottomSheet
                ref={sheetRef}
                height={250}
            >
                <View style={{
                    padding:15
                }} >
                    <Text weight="semi" size={20} >Sort list</Text>
                    <View style={{
                        flexDirection:"row",
                        justifyContent:"space-between",
                        paddingVertical:10,
                        alignItems:"center",
                        borderBottomWidth:1,
                        borderBottomColor:Colors.grey1
                    }} >
                        <Text weight="semi" >Stock Name</Text>
                        <View style={{
                            flexDirection:"row"
                        }} >
                            <TouchableOpacity style={{
                                padding:5
                            }} onPress={()=>{
                                sortName('desc')
                            }} >
                                <ArrowCircleDown2 color={Colors.textSecondary} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                padding:5
                            }} onPress={()=>{
                                sortName('asc')
                            }}>
                                <ArrowCircleUp2 color={Colors.textSecondary} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{
                        flexDirection:"row",
                        justifyContent:"space-between",
                        alignItems:"center",
                        paddingVertical:10,
                    }} >
                        <Text weight="semi" >Stock Price</Text>
                        <View style={{
                            flexDirection:"row"
                        }} >
                            <TouchableOpacity style={{
                                padding:5
                            }} onPress={()=>{
                                sortPrice('desc')
                            }} >
                                <ArrowCircleDown2 color={Colors.textSecondary} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                padding:5
                            }} onPress={()=>{
                                sortPrice('asc')
                            }} >
                                <ArrowCircleUp2 color={Colors.textSecondary} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Button
                        label="Close"
                        onPress={()=>{
                            sheetRef.current.close()
                        }}
                    />
                </View>
            </BottomSheet>
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
                    marginRight:-5
                }} onPress={()=>{
                    sheetRef.current.open()
                }}>
                    <Sort color={Colors.textSecondary} size={25} variant="Bold" />
                </TouchableOpacity>
            </View>
            {list.length < 1 && ListEmpty()}
            {list.length > 0 && renderList()}
            {sortSheet()}
        </View>
    )
}