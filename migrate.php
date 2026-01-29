<?php
require_once 'config/db.php';

try {
    // Read the migration file
    $sql = file_get_contents('sql/ram_migration.sql');
    
    // Remove comments
    $sql = preg_replace('/--.*$/m', '', $sql);
    
    // Split the SQL into individual statements
    $statements = array_filter(array_map('trim', explode(';', $sql)));

    $pdo->beginTransaction();
    foreach ($statements as $statement) {
        if (!empty($statement)) {
            $pdo->exec($statement);
        }
    }
    $pdo->commit();

    echo "✅ Migration completed successfully!<br>";
    echo "Database has been updated with RAMCORE products.<br>";
    echo "<a href='index.php'>Go to Home Page</a>";

} catch (Exception $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    echo "❌ Migration failed: " . $e->getMessage();
}
?>