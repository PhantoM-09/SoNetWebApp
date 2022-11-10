using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    [Table("RUSER")]
    public class User
    {
        [Key]
        [Column("USERID")]
        public int Id { get; set; }

        [Column("USEREMAIL", TypeName = "nvarchar(50)")]
        public string Email { get; set; }

        [Column("USERPASSWORD", TypeName = "nvarchar(100)")]
        public string Password { get; set; }

        [Column("USERLSTNAME", TypeName = "nvarchar(20)")]
        public string LastName { get; set; }

        [Column("USERNAME", TypeName = "nvarchar(20)")]
        public string Name { get; set; }

        //?
        [Column("USERSEX", TypeName = "nvarchar(6)")]
        public string Sex { get; set; }

        [Column("USERBDAY", TypeName = "date")]
        public DateTime BirthDay { get; set; }

        [Column("USERISONLINE", TypeName = "bit")]
        public bool IsOnline { get; set; }

        [Column("USERONLINEDATE", TypeName = "datetime")]
        public DateTime OnlineDate { get; set; }
        //Внешние
    }
}
