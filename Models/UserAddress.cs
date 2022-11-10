using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    [Table("SADDRESS")]
    public class UserAddress
    {
        [Key]
        [Column("ADDRESSID")]
        public int Id { get; set; }

        [Column("ADDRESSCOUNTRY", TypeName = "nvarchar(15)")]
        public string Country { get; set; }

        [Column("ADDRESSCITY", TypeName = "nvarchar(15)")]
        public string City { get; set; }
    }
}
