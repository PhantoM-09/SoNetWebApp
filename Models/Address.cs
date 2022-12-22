using Microsoft.EntityFrameworkCore;
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
    [Index(nameof(AddressCountry), IsUnique =true)]
    public class Address
    {
        [Column("ADDRESSID")]
        public int AddressId { get; set; }

        [Column("ADDRESSCOUNTRY")]
        public string AddressCountry { get; set; }

        [Column("ADDRESSCITY")]
        public string AddressCity { get; set; }

        public List<User> Users { get; set; }
    }
}
