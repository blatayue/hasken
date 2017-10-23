export default (fetcher) => {
    const fetchThing = async () => {
        let data = await fetcher()
        return data
    }
    return fetchThing
}


