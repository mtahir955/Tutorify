/**
 * @typedef {Object} Student
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} profilePicture
 */

/**
 * @typedef {Object} Tutor
 * @property {string} id
 * @property {string} name
 * @property {string} subject
 * @property {number} experience
 * @property {string} education
 * @property {string} profilePicture
 * @property {number} rating
 * @property {number} reviewCount
 */

/**
 * @typedef {Object} Request
 * @property {string} id
 * @property {string} tutorId
 * @property {string} tutorName
 * @property {string} subject
 * @property {"pending" | "accepted" | "rejected"} status
 * @property {string} date
 */

/**
 * @typedef {Object} Message
 * @property {string} id
 * @property {string} tutorId
 * @property {string} tutorName
 * @property {string} tutorAvatar
 * @property {string} lastMessage
 * @property {string} time
 * @property {boolean} unread
 */
