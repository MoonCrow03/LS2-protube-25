package com.tecnocampus.LS2.protube_back;

import com.tecnocampus.LS2.protube_back.domain.User;
import com.tecnocampus.LS2.protube_back.domain.Video;
import com.tecnocampus.LS2.protube_back.persistence.CommentRepository;
import com.tecnocampus.LS2.protube_back.persistence.UserRepository;
import com.tecnocampus.LS2.protube_back.persistence.VideoRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultMatcher;

import static net.bytebuddy.matcher.ElementMatchers.is;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.content;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest({
		"pro_tube.store.dir=c:",
		"pro_tube.load_initial_data=false"
})
@AutoConfigureMockMvc
class ProtubeBackVideoJsonTests {
    //TODO:(NOTA) ELS TESTS QUE FALLEN AL EXECUTAR TOTS ELS TESTOS ALHORA, FUNCIONEN AL EXECUTARSE DE MANERA INDEPENDENT

	static private String username, email, picture, auth0Id, title, description, content;
	static private Long duration, videoId;

	static private String inputUserJson;
	static private String inputVideoJson;
	static private String userEndpointURL;
	static private String inputCommentJson;

	static private MockMultipartFile videoFile,videoImage;

	@Autowired
	private UserRepository	userRepository;

	@Autowired
	VideoRepository videoRepository;

	@Autowired
	private CommentRepository commentRepository;

	@Autowired
	private MockMvc mockMvc;

	@Test
	void contextLoads() {

	}

	@BeforeAll
	static void setUp() throws Exception {
		username = "User1";
		email = "123@gmail.com";
		picture = "123";
		auth0Id = "123";
		title = "my first video";
		description = "my description";
		duration = 50L;
		videoId = 1L;
		content = "This is my first comment ever!";
		inputUserJson = String.format("{\"username\":\"%s\",\"email\":\"%s\",\"picture\":\"%s\",\"auth0Id\":\"%s\"}", username, email, picture, auth0Id);
		inputVideoJson = String.format("{\"title\":\"%s\",\"description\":\"%s\",\"duration\":%s,\"username\":\"%s\"}", title, description, duration, username);
		inputCommentJson = String.format("{\"username\":\"%s\",\"videoId\":%d,\"content\":\"%s\"}", username, videoId, content);
		userEndpointURL = "/api/users/" + username;

	}


	void cleanUp(){
		commentRepository.deleteAll();
		videoRepository.deleteAll();
		userRepository.deleteAll();
	}

	//USER TESTS
	@Test
	void createUserTest() throws Exception {
		mockMvc.perform(post("/api/users")
						.contentType(MediaType.APPLICATION_JSON)
						.content(inputUserJson))
				.andExpect(status().isCreated())
				.andExpect(jsonPath("$.username").value(username))
				.andExpect(jsonPath("$.email").value(email))
				.andExpect(jsonPath("$.picture").value(picture))
				.andExpect(jsonPath("$.auth0Id").value(auth0Id));

		User createdUser = userRepository.findByUsername(username).orElse(null);
		assert createdUser != null : "User should be found in the database";
		assert createdUser.getUsername().equals(username) : "user username not matching";
		assert createdUser.getEmail().equals(email) : "user email not matching";
		assert createdUser.getPicture().equals(picture);
		assert createdUser.getAuth0Id().equals(auth0Id);
	}

	@Test
	void getUserTest() throws Exception {
		userRepository.save(new User(username, email, auth0Id, picture));

		mockMvc.perform(get(userEndpointURL)
				.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isFound())
				.andExpect(jsonPath("$.username").value(username))
				.andExpect(jsonPath("$.email").value(email));
	}

	@Test
	void getUserThatDoesntExist() throws Exception { //TODO: (NOTA) Executar de manera indenpendent
		cleanUp();
		mockMvc.perform(get(userEndpointURL)
						.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isNotFound());
	}

	@Test
	@Transactional
	void deleteUserTest() throws Exception { //TODO: (NOTA) Executar de manera indenpendent
		userRepository.save(new User(username, email, auth0Id, picture));

		mockMvc.perform(get(userEndpointURL)
						.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isFound())
				.andExpect(jsonPath("$.username").value(username))
				.andExpect(jsonPath("$.email").value(email));

		mockMvc.perform(delete(userEndpointURL)
				.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk());

		mockMvc.perform(get(userEndpointURL)
						.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isNotFound());

	}


	//VIDEO TESTS
	@Test
	void createVideoTest() throws Exception { //TODO: (NOTA) Executar de manera indenpendent
		cleanUp();
		mockMvc.perform(post("/api/users")
						.contentType(MediaType.APPLICATION_JSON)
						.content(inputUserJson))
				.andExpect(status().isCreated())
				.andExpect(jsonPath("$.username").value(username));

		mockMvc.perform(post("/api/videos")
						.contentType(MediaType.APPLICATION_JSON)
						.content(inputVideoJson))
				.andExpect(status().isCreated())
				.andExpect(jsonPath("$.title").value(title))
				.andExpect(jsonPath("$.description").value(description))
				.andExpect(jsonPath("$.duration").value(duration))
				.andExpect(jsonPath("$.username").value(username));

		Video video = videoRepository.findByTitle(title).orElse(null);
		assert video != null;
		assert video.getTitle().equals(title);
		assert video.getDescription().equals(description);
		assert video.getDuration().equals(duration);
	}

	@Test
	void getAllVideosTest() throws Exception { //TODO: (NOTA) Executar de manera indenpendent
		videoRepository.deleteAll();
		mockMvc.perform(post("/api/users")
						.contentType(MediaType.APPLICATION_JSON)
						.content(inputUserJson))
				.andExpect(status().isCreated())
				.andExpect(jsonPath("$.username").value(username))
				.andExpect(jsonPath("$.email").value(email))
				.andExpect(jsonPath("$.picture").value(picture))
				.andExpect(jsonPath("$.auth0Id").value(auth0Id));

		mockMvc.perform(post("/api/videos")
						.contentType(MediaType.APPLICATION_JSON)
						.content(inputVideoJson))
				.andExpect(status().isCreated());

		mockMvc.perform(get("/api/videos/list")
						.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isFound())
				.andExpect(jsonPath("$.length()").value(1))
				.andExpect(jsonPath("$[0].title").value(title))
				.andExpect(jsonPath("$[0].duration").value(duration))
				.andExpect(jsonPath("$[0].user").value(username));
	}

	@Test
	void getVideoByTitleTest() throws Exception { //TODO: (NOTA) Executar de manera indenpendent
		mockMvc.perform(post("/api/users")
						.contentType(MediaType.APPLICATION_JSON)
						.content(inputUserJson))
				.andExpect(status().isCreated())
				.andExpect(jsonPath("$.username").value(username))
				.andExpect(jsonPath("$.email").value(email))
				.andExpect(jsonPath("$.picture").value(picture))
				.andExpect(jsonPath("$.auth0Id").value(auth0Id));

		mockMvc.perform(post("/api/videos")
						.contentType(MediaType.APPLICATION_JSON)
						.content(inputVideoJson))
				.andExpect(status().isCreated())
				.andExpect(jsonPath("$.title").value(title))
				.andExpect(jsonPath("$.description").value(description));

		mockMvc.perform(get("/api/videos/title/" + title)
						.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isFound())
				.andExpect(jsonPath("$.title").value(title))
				.andExpect(jsonPath("$.description").value(description))
				.andExpect(jsonPath("$.duration").value(duration))
				.andExpect(jsonPath("$.username").value(username));
	}

	@Test
	void getVideoBySearchTest() throws Exception {
		mockMvc.perform(post("/api/users")
						.contentType(MediaType.APPLICATION_JSON)
						.content(inputUserJson))
				.andExpect(status().isCreated())
				.andExpect(jsonPath("$.username").value(username));

		String newTitle = "top 10 most wanted test books";
		inputVideoJson = String.format("{\"title\":\"%s\",\"description\":\"%s\",\"duration\":%s,\"username\":\"%s\"}", newTitle, description, duration, username);

		mockMvc.perform(post("/api/videos")
						.contentType(MediaType.APPLICATION_JSON)
						.content(inputVideoJson))
				.andExpect(status().isCreated())
				.andExpect(jsonPath("$.title").value(newTitle))
				.andExpect(jsonPath("$.description").value(description))
				.andExpect(jsonPath("$.duration").value(duration))
				.andExpect(jsonPath("$.username").value(username));

		String input = "top 10";
		mockMvc.perform(get("/api/videos/search/"+input)
						.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isFound())
				.andExpect(jsonPath("$.length()").value(1))
				.andExpect(jsonPath("$[0].title").value(newTitle))
				.andExpect(jsonPath("$[0].description").value(description));

		input = "test books";
		mockMvc.perform(get("/api/videos/search/"+input)
						.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isFound())
				.andExpect(jsonPath("$.length()").value(1))
				.andExpect(jsonPath("$[0].title").value(newTitle))
				.andExpect(jsonPath("$[0].description").value(description));

	}

	//COMMENTS
	@Test
	@Order(0)
	void createCommentTest() throws Exception {
		mockMvc.perform(post("/api/users")
						.contentType(MediaType.APPLICATION_JSON)
						.content(inputUserJson))
				.andExpect(status().isCreated());

		mockMvc.perform(post("/api/videos")
						.contentType(MediaType.APPLICATION_JSON)
						.content(inputVideoJson))
				.andExpect(status().isCreated());

		mockMvc.perform(post("/api/videos/" + videoId + "/comments")
				.contentType(MediaType.APPLICATION_JSON)
				.content(inputCommentJson))
				.andExpect(status().isCreated())
				.andExpect(jsonPath("$.user").value(username))
				.andExpect(jsonPath("$.content").value(content));

	}


	@Test
	@Order(1)
	void getAllVideosComments()throws Exception{
		mockMvc.perform(get("/api/videos/" + videoId +"/comments"))
				.andExpect(status().isFound())
				.andExpect(jsonPath("$.length()").value(1))
				.andExpect(jsonPath("$[0].user").value(username))
				.andExpect(jsonPath("$[0].content").value(content));
	}

	@Test
	@Order(2)
	void patchCommentTest()throws Exception{ //TODO: (NOTA) Executar de manera indenpendent
		mockMvc.perform(post("/api/users")
						.contentType(MediaType.APPLICATION_JSON)
						.content(inputUserJson))
				.andExpect(status().isCreated());

		mockMvc.perform(post("/api/videos")
						.contentType(MediaType.APPLICATION_JSON)
						.content(inputVideoJson))
				.andExpect(status().isCreated());

		mockMvc.perform(post("/api/videos/" + videoId + "/comments")
						.contentType(MediaType.APPLICATION_JSON)
						.content(inputCommentJson))
				.andExpect(status().isCreated());

		String newContent = "new content";
		String updateComment = String.format("{\"content\":\"%s\"}", newContent);

		mockMvc.perform(patch("/api/comments/" + 1L)
						.contentType(MediaType.APPLICATION_JSON)
						.content(updateComment))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.content").value(newContent));

		mockMvc.perform(get("/api/videos/" + videoId +"/comments"))
				.andExpect(status().isFound())
				.andExpect(jsonPath("$[0].user").value(username))
				.andExpect(jsonPath("$[0].content").value(newContent));
	}



	@Test
	@Order(3)
	void deleteComment()throws Exception{

		mockMvc.perform(post("/api/users")
						.contentType(MediaType.APPLICATION_JSON)
						.content(inputUserJson))
				.andExpect(status().isCreated());

		mockMvc.perform(post("/api/videos")
						.contentType(MediaType.APPLICATION_JSON)
						.content(inputVideoJson))
				.andExpect(status().isCreated());

		mockMvc.perform(post("/api/videos/" + videoId + "/comments")
						.contentType(MediaType.APPLICATION_JSON)
						.content(inputCommentJson))
				.andExpect(status().isCreated());

		mockMvc.perform(delete("/api/comments/" + 1L))
				.andExpect(status().isOk());
	}
}
