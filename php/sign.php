<?php 
    require __DIR__ . '.\vendor\autoload.php';
    include('./includes/header.html');
    session_start();
    $conextion = conex();

?>
    <main class="read">
        <?php if($_SESSION['message'] == true) { ?>
            <script>alert('Bro, cannot repeat that shit!');</script>
        <?php session_unset(); } ?>

        <section class="main-section">
            <h1 class="main-section__title">Create a new user</h1>
            <p class="main-section__sub">You cannot enter a used email</p>

            <form action="create.php" method="post" class="section-form">

                    <label for="name" class="form-label">Name</label>
                    <input type="text" name="name" id="name" placeholder="Enter your real name" class="form-input form-input__name" autofocus>

                    <label for="lastname" class="form-label">cc</label>
                    <input type="number" name="lastname" id="lastname" placeholder="Type your real lastname" class="form-input form-input__lastname">

                    <label for="email" class="form-label">Email</label>
                    <input type="email" name="email" id="email" placeholder="Your email" class="form-input form-input__email">

                    <label for="username" class="form-label">Username</label>
                    <input type="text" name="username" id="username" placeholder="How do u feel?" class="form-input form-input__username">

                    <label for="password" class="form-label">Password</label>
                    <input type="password" name="password" id="username" placeholder="Trynna be cool" class="form-input form-input__password">

                    <input name="create_user" type="submit" value="Create User" class="form-button form-input__submit">
                    <input type="reset" value="Cancell" class="form-button form-input__reset">
            </form>
        </section>
    </main>

<?php

include("./includes/footer.html");
mysqli_close($conextion);