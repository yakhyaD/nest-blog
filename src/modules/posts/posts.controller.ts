import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards, Request, Put, Delete, Render, Response } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post';
import { PostsService } from './posts.service';


@Controller("posts")
export class PostsController {
    constructor(private readonly postsService: PostsService) {}


    @UseGuards(JwtAuthGuard)
    @Put(':id/edit')
    async updatePost(@Body() post: CreatePostDto, @Param('id', ParseIntPipe) id: number, @Request() req, @Response() res) {
        await this.postsService.updatePost(post, id, req.user.id);
        return res.redirect('/posts');
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id',ParseIntPipe) id: number, @Request() req, @Response() res) {
        console.log("delete");

        await this.postsService.deletePost(id, req.user.id);
        return res.redirect('/posts');
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createPost(@Body() post: CreatePostDto, @Request() req, @Response() res) {
        await this.postsService.createPost(post, req.user.id);
        return res.redirect('/posts');

    }

    @UseGuards(JwtAuthGuard)
    @Get(':id/edit')
    @Render('edit')
    async editPost(@Param('id', ParseIntPipe) id: number) {
        return { post: await this.postsService.findPostById(id) };
    }
    @Get('create')
    @Render('add')
    addPost() {
        return { title: "New Post" };
    }

    @Get()
    @Render('home')
    async getPosts(@Request() req) {
        return { posts: await this.postsService.getPosts(req) };
    }

    @Get(":id")
    @Render("show")
    async getPost(@Request() req, @Param("id", ParseIntPipe) id: number) {
        return {post: await this.postsService.getOnePost(req, id)};
    }





}
