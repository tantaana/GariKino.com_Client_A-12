import { useEffect, useState } from "react"

const useAdmin = userType => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true)
    useEffect(() => {
        if (userType) {
            fetch(`http://localhost:5000/users/admin/${userType}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setIsAdmin(data.isAdmin);
                    setIsAdminLoading(false)
                })
        }
    }, [userType])
    return [isAdmin, isAdminLoading]
}


export default useAdmin;