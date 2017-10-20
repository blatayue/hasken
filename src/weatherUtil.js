export default (fetcher) => {
    return async () => {
        let data = await fetcher()
        return data
    }
}

const filterWeather = (day) => {

}

