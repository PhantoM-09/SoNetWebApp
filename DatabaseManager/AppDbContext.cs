using Microsoft.EntityFrameworkCore;
using Models;

namespace DatabaseManager
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }

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
            modelBuilder.Entity<UFile>().HasKey(f=>f.FileId);
            modelBuilder.Entity<Friend>().HasKey(fr => new { fr.UserId, fr.FriendId });

            modelBuilder.Entity<Address>().HasMany(ua => ua.Users).WithOne(u => u.Address).HasForeignKey(u => u.AddressId).OnDelete(DeleteBehavior.ClientSetNull);
            modelBuilder.Entity<Block>().HasMany(b=>b.Users).WithOne(u => u.Block).HasForeignKey(u => u.BlockId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<User>().HasMany(u => u.Posts).WithOne(p => p.User).HasForeignKey(p => p.UserId).OnDelete(DeleteBehavior.ClientCascade); //Не понятно
            modelBuilder.Entity<User>().HasMany(u => u.Comments).WithOne(c => c.User).HasForeignKey(c=>c.UserId).OnDelete(DeleteBehavior.ClientCascade);
            modelBuilder.Entity<User>().HasMany(u => u.MessagesSend).WithOne(m => m.UserSend).HasForeignKey(m => m.UserSenderId).OnDelete(DeleteBehavior.ClientCascade);
            modelBuilder.Entity<User>().HasMany(u => u.MessagesReceive).WithOne(m => m.UserReceive).HasForeignKey(m => m.UserReceiverId).OnDelete(DeleteBehavior.ClientCascade); //ПРАВИТЬ ЧТОБЫ НЕ УДАЛЯЛИСЬ ПРИ УДАЛЕНИИ ПОЛЬЗОВАТЕЛЯ
            modelBuilder.Entity<User>().HasMany(u => u.Files).WithOne(f => f.User).HasForeignKey(f => f.UserId).OnDelete(DeleteBehavior.ClientCascade);
            modelBuilder.Entity<User>().HasMany(u => u.RelationSend).WithOne(fr => fr.User).HasForeignKey(fr => fr.UserId).OnDelete(DeleteBehavior.ClientCascade);               //Спорная
            modelBuilder.Entity<User>().HasMany(u => u.RelationReceive).WithOne(fr => fr.FriendUser).HasForeignKey(fr => fr.FriendId).OnDelete(DeleteBehavior.ClientCascade);    //ситуация
            modelBuilder.Entity<Post>().HasMany(p => p.Comments).WithOne(c => c.Post).HasForeignKey(c => c.PostId).OnDelete(DeleteBehavior.ClientCascade);
            
        }
    }
}
