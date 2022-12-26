using Microsoft.EntityFrameworkCore;
using Models;
using System.Security.Cryptography;
using System.Text;

namespace DatabaseManager
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Block> Blocks { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<UFile> UFiles { get; set; }
        public DbSet<Friend> Friends { get; set; }
        public DbSet<Like> Likes { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) 
            : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasKey(u => u.UserId);
            modelBuilder.Entity<Address>().HasKey(ua => ua.AddressId);
            modelBuilder.Entity<Block>().HasKey(b => b.BlockId);
            modelBuilder.Entity<Post>().HasKey(p => p.PostId);
            modelBuilder.Entity<Comment>().HasKey(c => c.CommentId);
            modelBuilder.Entity<Message>().HasKey(m => m.MessageId);
            modelBuilder.Entity<UFile>().HasKey(uf => uf.UFileId);
            modelBuilder.Entity<Friend>().HasKey(fr => fr.RelationId);
            modelBuilder.Entity<Like>().HasKey(l => l.LikeId);

            modelBuilder.Entity<Address>().HasMany(ua => ua.Users).WithOne(u => u.Address).HasForeignKey(u => u.AddressId).OnDelete(DeleteBehavior.SetNull);
            modelBuilder.Entity<Block>().HasMany(b => b.Users).WithOne(u => u.Block).HasForeignKey(u => u.BlockId).OnDelete(DeleteBehavior.SetNull);
            modelBuilder.Entity<User>().HasMany(u => u.Posts).WithOne(p => p.User).HasForeignKey(p => p.UserId).OnDelete(DeleteBehavior.NoAction); //Не понятно
            modelBuilder.Entity<User>().HasMany(u => u.Comments).WithOne(c => c.User).HasForeignKey(c => c.UserId).OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<User>().HasMany(u => u.MessagesSend).WithOne(m => m.UserSend).HasForeignKey(m => m.UserSenderId).OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<User>().HasMany(u => u.MessagesReceive).WithOne(m => m.UserReceive).HasForeignKey(m => m.UserReceiverId).OnDelete(DeleteBehavior.NoAction); //ПРАВИТЬ ЧТОБЫ НЕ УДАЛЯЛИСЬ ПРИ УДАЛЕНИИ ПОЛЬЗОВАТЕЛЯ
            modelBuilder.Entity<User>().HasMany(u => u.Files).WithOne(uf => uf.User).HasForeignKey(uf => uf.UserId).OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<User>().HasMany(u => u.RelationSend).WithOne(fr => fr.User).HasForeignKey(fr => fr.UserId).OnDelete(DeleteBehavior.NoAction);               //Спорная
            modelBuilder.Entity<User>().HasMany(u => u.RelationReceive).WithOne(fr => fr.FriendUser).HasForeignKey(fr => fr.FriendId).OnDelete(DeleteBehavior.NoAction);    //ситуация
            modelBuilder.Entity<User>().HasMany(u => u.Likes).WithOne(l => l.User).HasForeignKey(l => l.UserId).OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<Post>().HasMany(p => p.Comments).WithOne(c => c.Post).HasForeignKey(c => c.PostId).OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<Post>().HasMany(p => p.Likes).WithOne(l => l.Post).HasForeignKey(l => l.PostId).OnDelete(DeleteBehavior.NoAction);

            MD5 md5 = MD5.Create();
            var userEmail = "admin@mail.ru";
            modelBuilder.Entity<User>().HasData(new User
            {
                UserId = 1,
                UserEmail = userEmail,
                UserPassword = Convert.ToBase64String(
                                        md5.ComputeHash(
                                            Encoding.UTF8.GetBytes("1122"))),
                UserLastName = "Главный",
                UserName = "Администратор",
                UserSex = "Мужской",
                UserBirthDay = new DateTime(2001, 9, 26),
                UserType = "MainAdmin"
            });

            Directory.CreateDirectory("wwwroot/" + Convert.ToBase64String(
                                                           md5.ComputeHash(
                                                               Encoding.UTF8.GetBytes(userEmail))));

            modelBuilder.Entity<Address>().HasData(new Address
            {
                AddressId = 1,
                AddressCountry = "Беларусь",
                AddressCity = "Минск",
            });

            modelBuilder.Entity<Address>().HasData(new Address
            {
                AddressId = 2,
                AddressCountry = "Беларусь",
                AddressCity = "Брест",
            });

            modelBuilder.Entity<Address>().HasData(new Address
            {
                AddressId = 3,
                AddressCountry = "Беларусь",
                AddressCity = "Гродно",
            });

            modelBuilder.Entity<Address>().HasData(new Address
            {
                AddressId = 4,
                AddressCountry = "Беларусь",
                AddressCity = "Гомель",
            });
        }
    }
}
