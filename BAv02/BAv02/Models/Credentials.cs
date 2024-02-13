namespace BAv02.Models
{
    /// <summary>
    /// Class represents credentials for users.
    /// </summary>
    public class Credentials
    {
        /// <summary>
        /// Gets or sets an Email for User
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// Gets or sets Password for User.
        /// </summary>
        public string Password { get; set; }

        /// <summary>
        /// Gets or sets New Password for User.
        /// </summary>
        public string NewPassword { get; set; }
    }
}