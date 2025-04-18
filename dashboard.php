<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link rel="stylesheet" href="css/tailwind/output.css">
    <link rel="stylesheet" href="css/tailwind/style.css">
    <!-- Poppins font -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>
<body>
    <main class="flex h-full">
        <?php include("components/sidebar.php"); ?>
        <!-- Main Content -->
        <section class="flex-1 container mx-auto overflow-y-auto">
            <div class="px-5 py-5 grid grid-col grid-cols-4 gap-4 bg-slate-400 mx-auto">
                <div class="bg-white">
                    <p class="text-[21px]">Dashboard</p>
                </div>
                <div class="bg-white col-span-2">
                    <p>Search</p>
                </div>
                <div class="bg-white flex justify-between">
                    <p>Date</p>
                    <p>Icon</p>
                </div>
            </div>
        </section>
    </main>
</body>
</html>