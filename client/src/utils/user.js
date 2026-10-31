export const getProfile = () => JSON.parse(localStorage.getItem('profile'))

// Email/password users have `_id`; Google users store the decoded Google token, whose id is `sub`
// (that's also what the server's auth middleware uses as req.userId for Google tokens).
export const getUserId = (profile) => profile?.result?._id || profile?.result?.googleId || profile?.result?.sub
