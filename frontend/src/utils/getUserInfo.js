const getUserInfo = async (token, setData, setSrcFile, setOrgData, orgData) => {
    try {
        await fetch(`${process.env.REACT_APP_BASE_URL}/get-user-info`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(result => {
                if (result.image !== "") {
                    setSrcFile(`${process.env.REACT_APP_BASE_URL}/images/${result.image}`)
                }
                if (orgData) {
                    setOrgData(result)
                }
                return setData(result)
            })
    } catch (error) {
        console.log(error);
        return alert("Error fetching user data.")
    }
}

export default getUserInfo;