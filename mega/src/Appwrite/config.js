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
        { title, content, featuredImage, Status, userId }
      );
    } catch (error) {
      console.log(error);
    }
  }
  async updatePost(slug, { title, content, status, featuredImage, userId }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {}
  }
  async deletePost(slug) {
    try {
      this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
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
      console.log(error);
    }
  }
  async geetPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async uploadFile(file)
  {
    try {
      return await this.bucket.createFile(conf.appwriteBucketId,ID.unique(),file)
      
    } catch (error) {
      console.log(error);
      return false
    }
  }
  async deleteFile(fileId){
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId,fileId)
      
    } catch (error) {
      console.log(error);
      return false;
    }

  }
   async getFilePreview(fileId)
  {
      this.bucket.getFilePreview(conf.appwriteBucketId,fileId)
  }

}
const service = new Services();
export default service;