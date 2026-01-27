import { getUser } from "@/lib/getUser"

export default async function () {
    const user = await getUser()
    return (
        <div>
            {user.id}
            {user.email}
            {user.userType}
        </div>
    )
}