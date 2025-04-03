export interface ListingItemType {
    _id: string;
    type:
      | "Blog"
      | "Image"
      | "Link"
      | "Poll"
      | "Thought"
      | "Chat"
      | "Group"
      | "Video";
    title?: string;
    question?: string;
    image?: any;
    caption?: string;
    content?: string;
    videoUrl?: string;
    link?: string;
    linkDescription?: string;
    options?: { _id: string; text: string }[];
    createdAt?: string;
    createdBy?: {
      _id: string;
      username: string;
      profileImage?: string;
      name?: string;
    };
    likedBy?: string[];
    commentedBy?: { 
      user: string; 
      comment: string; 
      createdAt?: string;
     }[];
    savedBy?: string[];
  }
  