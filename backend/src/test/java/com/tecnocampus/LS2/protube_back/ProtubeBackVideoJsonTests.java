package com.tecnocampus.LS2.protube_back;

import com.tecnocampus.LS2.protube_back.domain.User;
import com.tecnocampus.LS2.protube_back.dto.record.InputUserRecord;
import com.tecnocampus.LS2.protube_back.persistence.UserRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultMatcher;

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

	static private String username;
	static private String password;
	static private String inputUserJson;
	static private String endpointURL;

	@Autowired
	private UserRepository	userRepository;

	@Autowired
	private MockMvc mockMvc;

	@Test
	void contextLoads() {

	}

	@BeforeAll
	static void setUp() throws Exception {
		username = "User1";
		password = "123";
		inputUserJson = String.format("{\"username\":\"%s\",\"password\":\"%s\"}", username, password);
		endpointURL = "/api/users/" + username;
	}

	//VIDEO TESTS
	@Test
	void createVideoTest(){

	}



	//USER TESTS
	@Test
	void createUserTest() throws Exception {
		mockMvc.perform(post("/api/users")
				.contentType(MediaType.APPLICATION_JSON)
				.content(inputUserJson))
				.andExpect(status().isCreated())
				.andExpect(jsonPath("$.username").value(username))
				.andExpect(jsonPath("$.password").value(password));

		User createdUser = userRepository.findByUsername(username).orElse(null);
		assert createdUser != null : "User should be found in the database";
		assert createdUser.getUsername().equals(username) : "user username not matching";
		assert createdUser.getPassword().equals(password) : "user password not matching";
	}


	@Test
	void getUserTest() throws Exception {
		userRepository.save(new User(username, password));

		mockMvc.perform(get(endpointURL)
				.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isFound())
				.andExpect(jsonPath("$.username").value(username))
				.andExpect(jsonPath("$.password").value(password));
	}

	@Test
	@Transactional
	void deleteUserTest() throws Exception {
		userRepository.save(new User(username, password));

		mockMvc.perform(get(endpointURL)
						.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isFound())
				.andExpect(jsonPath("$.username").value(username))
				.andExpect(jsonPath("$.password").value(password));

		mockMvc.perform(delete(endpointURL)
				.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk());

		mockMvc.perform(get(endpointURL)
						.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isNotFound());

	}



}
