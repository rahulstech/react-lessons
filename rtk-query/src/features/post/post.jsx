import Card from 'react-bootstrap/Card'
import Placeholder from 'react-bootstrap/Placeholder'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { useCreatePostMutation, useGetAllPostsQuery } from './postSlice'
import Modal from 'react-bootstrap/Modal'
import { useRef } from 'react'


function range(start,stop,step=1) {
    return Array(Math.ceil((stop-start)/step)).fill(start).map((e,i) => e + i*step);
}

export function PostInput(props) {

    const { refetch } = useGetAllPostsQuery();
    const [createPost, {isLoading, error}] = useCreatePostMutation();

    const refTitle = useRef();
    const refBody = useRef();

    function handleCreatePost(e) {
        e.preventDefault();
        e.stopPropagation();

        console.log('create post');

        const title = refTitle.current.value;
        const body = refBody.current.value;

        createPost({ title, body, userId: 1 }).unwrap()
        .then( payload => {
            console.log(payload);
            refetch();
        })
        .catch( error => {
            console.log(error);
        })
    }

    return (
        <Modal {...props} centered >
            <Modal.Header closeButton >
                <h4 className='text-center w-100'>Create New Post</h4>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleCreatePost}>
                    <fieldset disabled={isLoading}  className='d-flex flex-column justify-content-between'>
                        <Stack direction='vertical' gap={3} className='mb-3'>
                            <FloatingLabel controlId='inputPostTitle' label="Post Title">
                                <Form.Control ref={refTitle} type="text" placeholder='' />
                            </FloatingLabel>
                            <Form.Control as="textarea" ref={refBody} rows={12} placeholder='Write you post'/>
                        </Stack>
                        <Button type="submit" >Save</Button>
                    </fieldset>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export function PostGrid({ user }) {
    const { data, isLoading, error } = useGetAllPostsQuery(user);
    return (
        <Row className='g-3 rol-col-md-2' style={{ paddingTop: '64px', paddingBottom: '80px' }}>
            {
                isLoading ? range(0,10).map((n) => (
                    <Col key={n} md={6} lg={4}>
                        <PostPlaceholder />
                    </Col>
                ))
                : data.map((post) => (
                    <Col key={post.id} md={6} lg={4} className='object-fit-fill'>
                        <PostItem post={post} />
                    </Col>
                ))
            }
        </Row>
    )
}

export function PostItem({post}) {
    
    return (
        <Card>
            <Card.Header>
                <Button variant='primary' className='float-end' >View Post</Button>
            </Card.Header>
            <Card.Body>
                <Card.Title className='text-center'>{post.title}</Card.Title>
                <Card.Text>{post.body}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export function PostPlaceholder() {
    return (
        <Card>
            <Card.Header>
            <Placeholder.Button variant='primary' animation='glow' xs={4} className="float-end" 
                style={{ height: '28px'}} />
            </Card.Header>
            <Card.Body>
            <Placeholder as={Card.Title} animation="glow" className="mb-3">
                <Placeholder xs={12} />
            </Placeholder>
            <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={9} />
                <Placeholder xs={6} /> <Placeholder xs={4} /> <Placeholder xs={4} />
            </Placeholder>
            </Card.Body>
        </Card>
    )
}