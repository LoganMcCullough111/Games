using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace Games.Models.LowLevel
{
    public partial class GamesContext : DbContext
    {
        public GamesContext()
        {
        }

        public GamesContext(DbContextOptions<GamesContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TCredential> TCredentials { get; set; }
        public virtual DbSet<TGame> TGames { get; set; }
        public virtual DbSet<TGenre> TGenres { get; set; }
        public virtual DbSet<TRating> TRatings { get; set; }
        public virtual DbSet<TType> TTypes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlite("DataSource=Games.db");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TCredential>(entity =>
            {
                entity.HasKey(e => e.FUsername);

                entity.ToTable("tCredentials");

                entity.Property(e => e.FUsername).HasColumnName("fUsername");

                entity.Property(e => e.FCart)
                    .IsRequired()
                    .HasColumnName("fCart");

                entity.Property(e => e.FHash)
                    .IsRequired()
                    .HasColumnName("fHash");

                entity.Property(e => e.FSalt)
                    .IsRequired()
                    .HasColumnName("fSalt");
            });

            modelBuilder.Entity<TGame>(entity =>
            {
                entity.HasKey(e => e.FGameId);

                entity.ToTable("tGames");

                entity.Property(e => e.FGameId).HasColumnName("fGameID");

                entity.Property(e => e.FDescription)
                    .IsRequired()
                    .HasColumnName("fDescription");

                entity.Property(e => e.FGenre).HasColumnName("fGenre");

                entity.Property(e => e.FImageFile)
                    .IsRequired()
                    .HasColumnName("fImageFile");

                entity.Property(e => e.FPrice).HasColumnName("fPrice");

                entity.Property(e => e.FPublisher)
                    .IsRequired()
                    .HasColumnName("fPublisher");

                entity.Property(e => e.FRating).HasColumnName("fRating");

                entity.Property(e => e.FTitle)
                    .IsRequired()
                    .HasColumnName("fTitle");

                entity.Property(e => e.FType).HasColumnName("fType");

                entity.HasOne(d => d.FGenreNavigation)
                    .WithMany(p => p.TGames)
                    .HasForeignKey(d => d.FGenre)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.FRatingNavigation)
                    .WithMany(p => p.TGames)
                    .HasForeignKey(d => d.FRating)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.FTypeNavigation)
                    .WithMany(p => p.TGames)
                    .HasForeignKey(d => d.FType)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<TGenre>(entity =>
            {
                entity.HasKey(e => e.FGenreId);

                entity.ToTable("tGenres");

                entity.Property(e => e.FGenreId).HasColumnName("fGenreID");

                entity.Property(e => e.FGenreName)
                    .IsRequired()
                    .HasColumnName("fGenreName");
            });

            modelBuilder.Entity<TRating>(entity =>
            {
                entity.HasKey(e => e.FRatingId);

                entity.ToTable("tRatings");

                entity.Property(e => e.FRatingId).HasColumnName("fRatingID");

                entity.Property(e => e.FRatingCode)
                    .IsRequired()
                    .HasColumnName("fRatingCode");

                entity.Property(e => e.FRatingDesc)
                    .IsRequired()
                    .HasColumnName("fRatingDesc");
            });

            modelBuilder.Entity<TType>(entity =>
            {
                entity.HasKey(e => e.FTypeId);

                entity.ToTable("tTypes");

                entity.Property(e => e.FTypeId).HasColumnName("fTypeID");

                entity.Property(e => e.FTypeName)
                    .IsRequired()
                    .HasColumnName("fTypeName");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
