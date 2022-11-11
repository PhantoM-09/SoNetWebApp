using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.Metrics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    [Table("RUSER")]
    [Index(nameof(UserEmail), IsUnique = true)]
    public class User
    {
        [Column("USERID")]
        public int UserId { get; set; }

        [Column("USEREMAIL")]
        public string UserEmail { get; set; }

        [Column("USERPASSWORD")]
        public string UserPassword { get; set; }

        [Column("USERLSTNAME")]
        public string UserLastName { get; set; }

        [Column("USERNAME")]
        public string UserName { get; set; }

        [Column("USERSEX")]
        public string UserSex { get; set; }

        [Column("USERBDAY")]
        public DateTime UserBirthDay { get; set; }

        [Column("ADDRESSID")]
        public int AddressId { get; set; }

        [Column("USERISONLINE")]
        public bool UserIsOnline { get; set; }

        [Column("USERONLINEDATE")]
        public DateTime UserOnlineDate { get; set; }

        [Column("USERTYPE")]
        public int UserType { get; set; }

        [Column("BLOCKID")]
        public int BlockId { get; set; } = 0;

        public virtual Address Address { get; set; }
        public virtual Block Block { get; set; }
        public virtual ICollection<Post> Posts { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<Message> MessagesSend { get; set; }
        public virtual ICollection<Message> MessagesReceive { get; set; }
        public virtual ICollection<UFile> Files { get; set; }
        public virtual ICollection<Friend> RelationSend { get; set; }
        public virtual ICollection<Friend> RelationReceive { get; set; }
    }
}
