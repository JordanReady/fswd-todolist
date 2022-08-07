import $ from 'jquery';

import {
    indexTasks,
    postTask,
    deleteTask,
    markTaskComplete,
    markTaskActive
  } from "./requests.js";
  indexTasks();
  

  indexTasks(function (response) {
    var htmlString = response.tasks.map(function(task) {
      return "<div class='col-12 mb-3 p-2 border rounded task d-flex justify-content-between' data-id='" + task.id + "'>" + 
      "<input type='checkbox' class='mark-complete mr-2' data-id='" + task.id + "'" + (task.completed ? "checked" : "") + ">" +
      "<p class='task-content d-inline'>" + task.content + "</p>" +
      "<button class='delete float-right btn btn-outline-danger btn-sm' data-id='" + task.id + "'>Delete</button>" +
    "</div>";
    });
    $('#tasks').html(htmlString);
  });

  var displayAllTasks = function (response) {
    var htmlString = response.tasks.map(function(task) {
      return "<div class='col-12 mb-3 p-2 border rounded task d-flex justify-content-between'>" + 
        "<input type='checkbox' class='mark-complete mr-2' data-id='" + task.id + "'" + (task.completed ? "checked" : "") + ">" +
        "<p class='task-content d-inline'>" + task.content + "</p>" +
        "<button class='delete float-right btn btn-outline-danger btn-sm' data-id='" + task.id + "'>Delete</button>" +
      "</div>";
    });
  
    $("#tasks").html(htmlString);
  };

  $(document).on("turbolinks:load", function () {
    if ($('.static_pages.index').length > 0) {
      indexTasks(displayAllTasks);
    }
  });
  
  $(document).on('submit', '#create-task', function (e) {
    e.preventDefault();
    postTask($('#new-task-content').val(), function () {
      $('#new-task-content').val('');
      indexTasks(displayAllTasks);
    });
  });
  
  $(document).on('click', '.delete', function () {
    deleteTask($(this).data('id'), setTimeout(function() { indexTasks(displayAllTasks); }, 100));
  });
  
  $(document).on('change', '.mark-complete', function () {
    if (this.checked) {
      markTaskComplete($(this).data('id'));
    } else {
      markTaskActive($(this).data('id'));
    }
  });