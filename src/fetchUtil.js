export default (fetcher) => {
    return async () => {
        try {
            return await fetcher()
        } catch (err) {
            console.log(err)
            return err
        }
    }
}


