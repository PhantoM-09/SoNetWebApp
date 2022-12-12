using DatabaseManager.Pattern.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DatabaseManager.Pattern
{
    public class UnitOfWork : IDisposable
    {
        private AppDbContext _context;

        public UnitOfWork(AppDbContext appDbContext)
        {
            _context = appDbContext;
        }

        private AddressRepository _addressRepository;
        private UserRepository _userRepository;
        private BlockRepository _blockRepository;
        private PostRepository _postRepository;
        private CommentRepository _commentRepository;
        private MessageRepository _messageRepository;
        private UFileRepository _ufileRepository;
        private FriendRepository _friendRepository;
        private LikeRepository _likeRepository;

        public AddressRepository AddressRepository
        {
            get
            {
                if(_addressRepository == null)
                    _addressRepository = new AddressRepository(_context);
                return _addressRepository;
            }
        }

        public UserRepository UserRepository
        {
            get
            {
                if (_userRepository == null)
                    _userRepository = new UserRepository(_context);
                return _userRepository;
            }
        }

        public BlockRepository BlockRepository
        {
            get
            {
                if (_blockRepository == null)
                    _blockRepository = new BlockRepository(_context);
                return _blockRepository;
            }
        }

        public PostRepository PostRepository
        {
            get
            {
                if (_postRepository == null)
                    _postRepository = new PostRepository(_context);
                return _postRepository;
            }
        }

        public CommentRepository CommentRepository
        {
            get
            {
                if (_commentRepository == null)
                    _commentRepository = new CommentRepository(_context);
                return _commentRepository;
            }
        }

        public MessageRepository MessageRepository
        {
            get
            {
                if (_messageRepository == null)
                    _messageRepository = new MessageRepository(_context);
                return _messageRepository;
            }
        }

        public UFileRepository UFileRepository
        {
            get
            {
                if (_ufileRepository == null)
                    _ufileRepository = new UFileRepository(_context);
                return _ufileRepository;
            }
        }

        public FriendRepository FriendRepository
        {
            get
            {
                if (_friendRepository == null)
                    _friendRepository = new FriendRepository(_context);
                return _friendRepository;
            }
        }

        public LikeRepository LikeRepository
        {
            get
            {
                if (_likeRepository == null)
                    _likeRepository = new LikeRepository(_context);
                return _likeRepository;
            }
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        private bool disposed = false;

        public virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
                this.disposed = true;
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
