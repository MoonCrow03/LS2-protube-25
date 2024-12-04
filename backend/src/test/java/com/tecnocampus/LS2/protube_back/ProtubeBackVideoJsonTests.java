package com.tecnocampus.LS2.protube_back;

import com.tecnocampus.LS2.protube_back.domain.User;
import com.tecnocampus.LS2.protube_back.domain.Video;
import com.tecnocampus.LS2.protube_back.persistence.CommentRepository;
import com.tecnocampus.LS2.protube_back.persistence.UserRepository;
import com.tecnocampus.LS2.protube_back.persistence.VideoRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static net.bytebuddy.matcher.ElementMatchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest({
		"pro_tube.store.dir=c:",
		"pro_tube.load_initial_data=false"
})
@AutoConfigureMockMvc
class ProtubeBackVideoJsonTests {

	static private String username, email, picture, auth0Id, title, description;
	static private Long duration;

	static private String inputUserJson;
	static private String inputVideoJson;
	static private String userEndpointURL;

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
		inputUserJson = String.format("{\"username\":\"%s\",\"email\":\"%s\",\"picture\":\"%s\",\"auth0Id\":\"%s\"}", username, email, picture, auth0Id);
		inputVideoJson = String.format("{\"title\":\"%s\",\"description\":\"%s\",\"duration\":%s,\"username\":\"%s\"}", title, description, duration, username);
		userEndpointURL = "/api/users/" + username;
	}

	@AfterEach
	void cleanUp(){
		userRepository.deleteAll();
		videoRepository.deleteAll();
		commentRepository.deleteAll();
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
	void getUserThatDoesntExist() throws Exception {
		mockMvc.perform(get(userEndpointURL)
						.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isNotFound());
	}

	@Test
	@Transactional
	void deleteUserTest() throws Exception {
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
	void createVideoTest() throws Exception {
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
	void createVideoWithFiles(){

	}

	@Test
	void getAllVideosTest() throws Exception {
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
				.andExpect(jsonPath("$.description").value(description))
				.andExpect(jsonPath("$.duration").value(duration))
				.andExpect(jsonPath("$.username").value(username));

		mockMvc.perform(get("/api/videos/list")
						.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isFound())
				.andExpect(jsonPath("$.length()").value(1))
				.andExpect(jsonPath("$[0].title").value(title));
	}

	@Test
	void getVideoByTitleTest() throws Exception {
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
				.andExpect(jsonPath("$.description").value(description))
				.andExpect(jsonPath("$.duration").value(duration))
				.andExpect(jsonPath("$.username").value(username));

		mockMvc.perform(get("/api/videos/title/" + title)
						.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isFound())
				.andExpect(jsonPath("$.title").value(title))
				.andExpect(jsonPath("$.description").value(description));
	}

	//TODO: provar a pujar files de videos reals, per poder fer el delete. Mes el testos dels comentaris.
	//TODO: obtenir videos amb la lupa.
}
