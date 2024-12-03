import { PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe('.findMany', () => {
    const posts = [
      { text: 'Post 1' },
      { text: 'Post 2' },
      { text: 'Post 3' },
      { text: 'Post 4' },
    ];

    let createdPosts: string | any[];

    beforeEach(() => {
      createdPosts = posts.map((post) => postsService.create(post));
    });

    it('should return all posts if called without options', () => {
      const foundPosts = postsService.findMany();
      expect(foundPosts).toEqual(createdPosts);
    });

    it('should return correct posts for skip and limit options', () => {
      const foundPosts = postsService.findMany({ skip: 1, limit: 2 });
      expect(foundPosts).toEqual(createdPosts.slice(1, 3));
    });

    it('should return correct posts for skip option', () => {
      const foundPosts = postsService.findMany({ skip: 2 });
      expect(foundPosts).toEqual(createdPosts.slice(2));
    });

    it('should return correct posts for limit option', () => {
      const foundPosts = postsService.findMany({ limit: 2 });
      expect(foundPosts).toEqual(createdPosts.slice(0, 2));
    });

    it('should return empty array for skip and limit options', () => {
      const foundPosts = postsService.findMany({ skip: 4, limit: 2 });
      expect(foundPosts).toEqual([]);
    });

    it('should return empty array for skip option', () => {
      const foundPosts = postsService.findMany({ skip: 4 });
      expect(foundPosts).toEqual([]);
    });

    it('should return empty array for limit option', () => {
      const foundPosts = postsService.findMany({ limit: 0 });
      expect(foundPosts).toEqual([]);
    });
  });
});
