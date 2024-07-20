import { Client, ID, Databases, Storage, Query } from "appwrite";
import conf from "../Config/conf";

export class Services {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, status, featuredImage, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
         { title, content,  status,Image:featuredImage, userId }
      );
    } catch (error) {
      console.error('Error creating post:', error);
      throw error; 
    }
  }

  async updatePost(slug, { title, content, status, featuredImage, userId }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        { title, content, Image:featuredImage, status,userId }
      );
    } catch (error) {
      console.error('Error updating post:', error);
      throw error; // Propagate the error
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error; // Propagate the error
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.error('Error fetching post:', error);
      throw error; // Propagate the error
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.error('Error fetching posts:', error);
      return false
      throw error;
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(conf.appwriteBucketId,ID.unique(), file);
    } 
    catch (error) {
      console.error('Error uploading file:', error);
      throw error;
      return false
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId); 
      return true;
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error; // Propagate the error
    }
  }

  async getFilePreview(fileId) {
    try {
        // Correctly awaiting the getFilePreview call
        const previewUrl = await this.bucket.getFilePreview(conf.appwriteBucketId,String(fileId));
        console.log(previewUrl); // Log the preview URL for debugging purposes
        return previewUrl; // Return the preview URL
    } catch (error) {
        console.error('Error fetching image preview:', error); // Log any errors encountered
        throw error; // Re-throw the error to allow further handling up the call stack
    }
}

};

const service = new Services();
export default service;
