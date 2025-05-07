import { capitialize } from "../utils"

const BadgeLanguage = ({ user }: { user: userType }) => {
    return (
        <>
            <span className="badge badge-secondary badge-sm">
                Native: {capitialize(user.nativeLanguage)}
            </span>
            <span className="badge badge-accent badge-sm">
                Learning: {capitialize(user.learningLanguage)}
            </span>
        </>
    )
}
export default BadgeLanguage