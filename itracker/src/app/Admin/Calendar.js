import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native-web'
// import { StatusBar } from 'expo-status-bar';
import moment from 'moment'
import { useEffect, useState } from 'react'
export default function CalendarHelper() {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            // alignItems: 'center',
            // justifyContent: 'center',
        },
    })
    const [selectedDate, setSelectedDate] = useState(null);
    return (
        <View style={styles.container}>
            <Calendar onSelectDate={setSelectedDate} selected={selectedDate} />
            {/* <StatusBar style="auto" /> */}
            <Schedule />
        </View>
    );
}

const Schedule = ({ selected }) => {
    const [time, setTimes] = useState([])

    return (
        <div>
            <Time times={time} />
        </div>
    )
}
const Calendar = ({ onSelectDate, selected }) => {
    const [dates, setDates] = useState([])
    // Storing 8 days in storage for faster rendering
    const getDates = () => {
        const _dates = []
        for (let i = 0; i < 8; i++) {
            const date = moment().add(i, 'days')
            _dates.push(date)
        }
        setDates(_dates)
    }
    useEffect(() => {
        getDates()
    }, [])
    return (
        <div class="w-[350px]">
            <View class="w-[100%]">
                <View class="h-[100px]">
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        {dates.map((date, index) => (
                            <Date
                                key={index}
                                date={date}
                                onSelectDate={onSelectDate}
                                selected={selected}
                            />
                        ))}
                    </ScrollView>
                </View>

            </View>
        </div>

    )
}
const Time = ({ times }) => {
    const hour = moment().hour()
    const minute = moment().minute();
    const fullTime = (hour, ":", minute);
    // var mom=moment('')
    //     var mom = moment('171054', 'HHmmss');
    // console.log(mom.format());
    // console.log(mom.format('HH:mm:ss'));
    return (
        <div>
            {fullTime}
        </div>
    )
}
const Date = ({ date, onSelectDate, selected }) => {
    // comparing dates to decide which one to display first 
    const day = moment(date).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD') ? 'Today' : moment(date).format('ddd')
    const dayNumber = moment(date).format('D')
    const fullDate = moment(date).format('YYYY-MM-DD')
    const styles = StyleSheet.create({
        card: {
            backgroundColor: '#eee',
            borderRadius: 10,
            borderColor: '#ddd',
            padding: 5,
            marginVertical: 10,
            alignItems: 'center',
            height: 75,
            width: 44,
            marginHorizontal: 3,
        },
        big: { fontWeight: 'bold', fontSize: 14, },
    })
    return (
        <div>
            <div>
                <TouchableOpacity
                    onPress={() => onSelectDate(fullDate)}
                    style={[styles.card, selected === fullDate && { backgroundColor: "#CFD4F1" }]}
                >
                    <Text
                        style={[styles.big, selected === fullDate && { color: "#5a6acf" }]}
                    >
                        {day}
                    </Text>
                    <View style={{ height: 10 }} />
                    <Text
                        class="text-base font-bold"
                        style={[
                            // styles.medium,
                            selected === fullDate && { color: "#5a6acf", fontWeight: 'bold', fontSize: 18 },
                        ]}
                    >
                        {dayNumber}
                    </Text>
                </TouchableOpacity>
            </div>
        </div>

    )
}
